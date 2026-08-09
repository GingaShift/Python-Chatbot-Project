import os
import sys
import json
import math
import hashlib
import datetime

import presidents as les_presidents
import string_manager as sm
import TF_IDF as tf_idf
import math_vecteurs as math_vect

ROOT = os.path.dirname(os.path.abspath(__file__))
SPEECHES_DIR = os.path.join(ROOT, "speeches")
OUT_DIR = os.path.join(ROOT, "docs", "data")
OUT_PATH = os.path.join(OUT_DIR, "vectorspace.json")

# Variante d'IDF utilisée pour l'espace vectoriel exporté (bascule : --idf classic|smooth).
# "classic" = log10(N/df), formule du moteur réel (TF_IDF.creer_matrice_idf).
# "smooth"  = log10((1+N)/(1+df)) + 1, variante lissée (type scikit-learn) : jamais de
# division par un df nul, et idf ne descend jamais sous 1 même pour un mot dans tous les docs.
# Ne change RIEN au moteur Tkinter (TF_IDF.py garde sa formule classique) — uniquement
# l'espace vectoriel calculé ici pour la visualisation.
# "smooth" retenu par défaut : sur ce corpus il donne la plus faible distorsion angulaire
# des quatre combinaisons mesurées (LSA classic=40.33°, LSA smooth=20.54°, MDS classic=32.59°,
# MDS smooth=60.48°) — au prix d'une MDS nettement pire ; voir le README pour le détail.
IDF_VARIANT = "smooth"


def idf_classic(n_docs, df):
    return math.log10(n_docs / df)


def idf_smooth(n_docs, df):
    return math.log10((1 + n_docs) / (1 + df)) + 1


IDF_FORMULAS = {"classic": idf_classic, "smooth": idf_smooth}


def parse_idf_flag(argv):
    if "--idf" in argv:
        i = argv.index("--idf")
        if i + 1 >= len(argv) or argv[i + 1] not in IDF_FORMULAS:
            raise SystemExit(f"--idf doit valoir classic ou smooth (reçu {argv[i + 1:i + 2]!r})")
        return argv[i + 1]
    return IDF_VARIANT


def compute_df(vocab, occurrence_dicts_par_doc):
    dicts = list(occurrence_dicts_par_doc.values())
    return [sum(1 for d in dicts if w in d) for w in vocab]

# Année d'investiture de chaque discours (fait historique public, non calculable depuis le corpus).
ANNEES = {
    "Chirac1": 1995, "Chirac2": 2002,
    "Giscard dEstaing": 1974,
    "Hollande": 2012,
    "Macron": 2017,
    "Mitterrand1": 1981, "Mitterrand2": 1988,
    "Sarkozy": 2007,
}
NOMS_AFFICHES = {
    "Chirac1": "Chirac", "Chirac2": "Chirac",
    "Giscard dEstaing": "Giscard d'Estaing",
    "Hollande": "Hollande",
    "Macron": "Macron",
    "Mitterrand1": "Mitterrand", "Mitterrand2": "Mitterrand",
    "Sarkozy": "Sarkozy",
}

# Palette chronologique validée (skill dataviz) : ramp ordinal une-teinte (bleu), 8 pas
# OKLCH uniformes entre les ancres documentées #cde2fb (step100) et #184f95 (step600,
# plancher de contraste sur fond sombre). ΔL adjacent >= 0.06, contraste et teinte
# unique valides sur la surface #04050A de l'instrument. Du plus ancien (sombre) au
# plus récent (clair).
PALETTE_CHRONO = ["#184f95", "#3364a4", "#4c78b2", "#648dc1", "#7ea2d0", "#97b7de", "#b2cced", "#cde2fb"]

TOP_TERMS_PAR_DOC = 12
TOP_TERMS_GLOBAL = 200


def stem(nom_fichier):
    return nom_fichier.replace("Nomination_", "").replace(".txt", "")


def clamp(x, lo, hi):
    return max(lo, min(hi, x))


def dot3(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def unit_sphere(vec3):
    norme = math.sqrt(sum(x * x for x in vec3))
    if norme < 1e-12:
        return [0.0, 0.0, 1.0]
    return [x / norme for x in vec3]


def l2_normalize(vecteur):
    # Absent du moteur (calcul_similarite_vecteurs divise par les normes à chaque appel
    # au lieu de stocker des vecteurs unitaires) — fonction dédiée à l'export, n'altère
    # pas le comportement de main.py.
    norme = math_vect.calculer_norme_vecteur(vecteur)
    if norme == 0:
        return list(vecteur)
    return [x / norme for x in vecteur]


def warn_if_stale(speeches_dir, out_path):
    if not os.path.exists(out_path):
        return
    json_mtime = os.path.getmtime(out_path)
    plus_recents = [f for f in os.listdir(speeches_dir)
                     if f.endswith(".txt") and os.path.getmtime(os.path.join(speeches_dir, f)) > json_mtime]
    if plus_recents:
        print(f"[avertissement] {out_path} est plus ancien que {len(plus_recents)} fichier(s) de speeches/ : "
              f"{', '.join(plus_recents)} — les chiffres exportés sont potentiellement obsolètes.")


def hash_corpus(speeches_dir):
    h = hashlib.sha256()
    for filename in sorted(os.listdir(speeches_dir)):
        if filename.endswith(".txt"):
            h.update(filename.encode("utf-8"))
            with open(os.path.join(speeches_dir, filename), "rb") as f:
                h.update(f.read())
    return h.hexdigest()


def build_engine():
    les_presidents.liste_noms_fichiers_discours_presidents = les_presidents.obtenir_nom_fichiers_discours_presidents(
        les_presidents.dossier_discours_presidents)
    les_presidents.nombre_docs_fichiers_discours_presidents = len(les_presidents.liste_noms_fichiers_discours_presidents)
    les_presidents.remplir_dico_fichiers_discours_presidents_depuis_la_liste(les_presidents.liste_noms_fichiers_discours_presidents)

    sm.convertir_texte_en_minuscules(les_presidents.liste_noms_fichiers_discours_presidents,
                                      les_presidents.dossier_discours_presidents_nettoyes)
    sm.nettoyer_textes_du_dossier(les_presidents.dossier_discours_presidents_nettoyes)

    tf_idf.les_dicos_occurrences_mots_corpus = tf_idf.creer_tous_les_dicos_occurrences_mots(
        les_presidents.dossier_discours_presidents_nettoyes)
    tf_idf.matrice_tf_corpus = tf_idf.creer_matrice_tf(tf_idf.les_dicos_occurrences_mots_corpus)
    tf_idf.matrice_idf_corpus = tf_idf.creer_matrice_idf(les_presidents.dossier_discours_presidents_nettoyes)
    tf_idf.matrice_tf_idf_corpus = tf_idf.creer_matrice_tf_idf(
        les_presidents.dossier_discours_presidents_nettoyes, tf_idf.les_dicos_occurrences_mots_corpus,
        tf_idf.matrice_tf_corpus, tf_idf.matrice_idf_corpus)
    tf_idf.matrice_tf_idf_corpus_transposee = tf_idf.transpose_matrice(tf_idf.matrice_tf_idf_corpus)


# ─── Jacobi (valeurs/vecteurs propres, matrices symétriques) ────────────────────

def jacobi_eigen(A, n, max_sweeps=200, tol=1e-15):
    M = [row[:] for row in A]
    V = [[1.0 if i == j else 0.0 for j in range(n)] for i in range(n)]
    # seuil de convergence relatif à l'échelle de la matrice : une variante d'IDF avec des
    # valeurs plus grandes (ex. smooth, jamais < 1.0) ne doit pas empêcher la convergence
    # d'un seuil absolu calibré sur l'échelle de l'IDF classique.
    scale = sum(M[i][j] ** 2 for i in range(n) for j in range(n)) or 1.0

    for _ in range(max_sweeps):
        off = sum(M[p][q] ** 2 for p in range(n) for q in range(p + 1, n))
        if off < tol * scale:
            break
        for p in range(n):
            for q in range(p + 1, n):
                if abs(M[p][q]) < 1e-15:
                    continue
                theta = (M[q][q] - M[p][p]) / (2 * M[p][q])
                sign = 1.0 if theta >= 0 else -1.0
                t = sign / (abs(theta) + math.sqrt(theta * theta + 1))
                c = 1.0 / math.sqrt(t * t + 1)
                s = t * c
                for k in range(n):
                    a, b = M[k][p], M[k][q]
                    M[k][p], M[k][q] = c * a - s * b, s * a + c * b
                for k in range(n):
                    a, b = M[p][k], M[q][k]
                    M[p][k], M[q][k] = c * a - s * b, s * a + c * b
                for k in range(n):
                    a, b = V[k][p], V[k][q]
                    V[k][p], V[k][q] = c * a - s * b, s * a + c * b

    order = sorted(range(n), key=lambda i: -M[i][i])
    eigenvalues = [M[i][i] for i in order]
    eigenvectors = [[V[k][i] for k in range(n)] for i in order]

    # Polish : quand deux valeurs propres sont proches (écart < ~0.01), le vecteur propre
    # correspondant devient mal conditionné pour une rotation de Jacobi classique — l'erreur
    # A.v - lambda.v peut dépasser 1e-10 même si les rotations ont bien convergé (observé avec
    # l'IDF lissé : écart 0.0088 entre 2 valeurs propres de la matrice MDS, résidu ~4e-10 stable
    # quel que soit le nombre de sweeps). Une itération inverse (décalée sur la valeur propre déjà
    # précise à ~1e-8 près) corrige ça en 1-2 pas, sans changer les valeurs propres elles-mêmes.
    eigenvectors = [
        refine_eigenvector(A, eigenvalues[k], eigenvectors[k], n)
        for k in range(n)
    ]
    return eigenvalues, eigenvectors


def solve_linear(A, b, n):
    M = [A[i][:] + [b[i]] for i in range(n)]
    for col in range(n):
        piv = max(range(col, n), key=lambda r: abs(M[r][col]))
        M[col], M[piv] = M[piv], M[col]
        pivot = M[col][col]
        if abs(pivot) < 1e-300:
            return None
        for r in range(col + 1, n):
            factor = M[r][col] / pivot
            for c in range(col, n + 1):
                M[r][c] -= factor * M[col][c]
    x = [0.0] * n
    for row in range(n - 1, -1, -1):
        s = M[row][n] - sum(M[row][c] * x[c] for c in range(row + 1, n))
        x[row] = s / M[row][row]
    return x


def refine_eigenvector(A, lam, v, n, iters=2):
    shift = lam + 1e-6 * (abs(lam) + 1.0)
    shifted = [[A[i][j] - (shift if i == j else 0.0) for j in range(n)] for i in range(n)]
    x = v[:]
    for _ in range(iters):
        y = solve_linear(shifted, x, n)
        if y is None:
            return x
        norm = math.sqrt(sum(c * c for c in y))
        if norm < 1e-300:
            return x
        y = [c / norm for c in y]
        if sum(a * b for a, b in zip(x, y)) < 0:
            y = [-c for c in y]
        x = y
    return x


def verify_jacobi(A, eigenvalues, eigenvectors, n, tol=1e-10):
    # Phase 3.2 : A.v = lambda.v à 1e-10 près pour chaque vecteur propre.
    max_err = 0.0
    for k in range(n):
        v = eigenvectors[k]
        lam = eigenvalues[k]
        Av = [sum(A[i][j] * v[j] for j in range(n)) for i in range(n)]
        err = max(abs(Av[i] - lam * v[i]) for i in range(n))
        max_err = max(max_err, err)
        assert err < tol, f"Jacobi: A.v != lambda.v pour le vecteur propre {k} (erreur {err:.3e})"
    return max_err


# ─── Projections 3D ──────────────────────────────────────────────────────────

def build_mds_dissimilarity(G, n):
    delta2 = [[math.acos(clamp(G[i][j], -1.0, 1.0)) ** 2 for j in range(n)] for i in range(n)]
    row_mean = [sum(row) / n for row in delta2]
    grand_mean = sum(row_mean) / n
    return [[-0.5 * (delta2[i][j] - row_mean[i] - row_mean[j] + grand_mean) for j in range(n)] for i in range(n)]


def build_embedding(A, G_true, n_docs, doc_vectors_l2, vocab, vocab_size, top_n=TOP_TERMS_GLOBAL):
    eigenvalues, eigenvectors = jacobi_eigen(A, n_docs)
    jacobi_max_err = verify_jacobi(A, eigenvalues, eigenvectors, n_docs)

    total_pos = sum(max(v, 0.0) for v in eigenvalues)
    top3 = sum(max(eigenvalues[k], 0.0) for k in range(3))
    explained_variance = (top3 / total_pos) if total_pos > 0 else 0.0

    positions = []
    for i in range(n_docs):
        coord = [eigenvectors[k][i] * math.sqrt(max(eigenvalues[k], 0.0)) for k in range(3)]
        positions.append(unit_sphere(coord))
        assert abs(math.sqrt(sum(c * c for c in positions[-1])) - 1.0) < 1e-9

    true_angles = [[math.acos(clamp(G_true[i][j], -1.0, 1.0)) for j in range(n_docs)] for i in range(n_docs)]
    sq_err_sum, n_pairs = 0.0, 0
    for i in range(n_docs):
        for j in range(i + 1, n_docs):
            screen_angle = math.acos(clamp(dot3(positions[i], positions[j]), -1.0, 1.0))
            sq_err_sum += (screen_angle - true_angles[i][j]) ** 2
            n_pairs += 1
    assert n_pairs == 28
    angular_distortion_deg = math.degrees(math.sqrt(sq_err_sum / n_pairs))

    terms = []
    for j in range(vocab_size):
        coord = []
        for k in range(3):
            lam = max(eigenvalues[k], 1e-12)
            s = sum(doc_vectors_l2[i][j] * eigenvectors[k][i] for i in range(n_docs))
            coord.append(s / math.sqrt(lam))
        mag = math.sqrt(sum(c * c for c in coord))
        terms.append((vocab[j], coord, mag))
    terms.sort(key=lambda t: t[2], reverse=True)
    term_positions = [{"t": w, "p": unit_sphere(c), "mag": mag} for w, c, mag in terms[:top_n]]

    return {
        "positions": positions,
        "eigenvalues": eigenvalues,
        "eigenvectors": eigenvectors,
        "explained_variance": explained_variance,
        "angular_distortion_deg": angular_distortion_deg,
        "term_positions": term_positions,
        "_jacobi_max_err": jacobi_max_err,
    }


def main():
    idf_variant = parse_idf_flag(sys.argv[1:])
    quiet = "--quiet" in sys.argv[1:]

    warn_if_stale(SPEECHES_DIR, OUT_PATH)
    build_engine()

    n_docs = les_presidents.nombre_docs_fichiers_discours_presidents
    vocab = [row[0] for row in tf_idf.matrice_idf_corpus]
    idf_engine = [row[1] for row in tf_idf.matrice_idf_corpus]  # IDF classique du moteur réel, inchangé
    vocab_size = len(vocab)
    assert vocab == tf_idf.matrice_tf_idf_corpus_transposee[0], \
        "l'ordre du vocabulaire diffère entre matrice_idf_corpus et matrice_tf_idf_corpus_transposee"

    df = compute_df(vocab, tf_idf.les_dicos_occurrences_mots_corpus)
    for j in range(vocab_size):
        assert abs(idf_classic(n_docs, df[j]) - idf_engine[j]) < 1e-9, \
            f"df recalculé incohérent avec l'IDF du moteur pour {vocab[j]!r}"

    idf = [IDF_FORMULAS[idf_variant](n_docs, df[j]) for j in range(vocab_size)]

    tf_transposed = tf_idf.transpose_matrice(tf_idf.matrice_tf_corpus)
    assert tf_transposed[0] == vocab, "l'ordre du vocabulaire diffère pour matrice_tf_corpus"

    noms_fichiers = [les_presidents.dico_fichiers_discours_presidents[i] for i in range(1, n_docs + 1)]
    doc_rows_raw = [[tf_transposed[i + 1][j] * idf[j] for j in range(vocab_size)] for i in range(n_docs)]

    if idf_variant == "classic":
        for i in range(n_docs):
            for j in range(vocab_size):
                err = abs(doc_rows_raw[i][j] - tf_idf.matrice_tf_idf_corpus_transposee[i + 1][j])
                assert err < 1e-9, f"doc {i} terme {j}: recalcul {doc_rows_raw[i][j]!r} != moteur {tf_idf.matrice_tf_idf_corpus_transposee[i + 1][j]!r}"

    doc_vectors_l2 = [l2_normalize(row) for row in doc_rows_raw]

    # 3.1 — Gram = matrice des cosinus (vecteurs unitaires) ; identité pure D.Dt = cos, vraie
    # quelle que soit la variante d'IDF (calcul_similarite_vecteurs ne connaît pas la variante,
    # elle prend juste les vecteurs bruts qu'on lui donne et divise par leurs normes).
    G = [[math_vect.calculer_produit_scalaire_vecteurs(doc_vectors_l2[i], doc_vectors_l2[j])
          for j in range(n_docs)] for i in range(n_docs)]
    max_gram_err = 0.0
    for i in range(n_docs):
        assert abs(G[i][i] - 1.0) < 1e-9, f"G[{i}][{i}] devrait valoir 1.0, vaut {G[i][i]}"
        for j in range(n_docs):
            ref = math_vect.calcul_similarite_vecteurs(doc_rows_raw[i], doc_rows_raw[j])
            err = abs(G[i][j] - ref)
            max_gram_err = max(max_gram_err, err)
            assert err < 1e-9, f"G[{i}][{j}]={G[i][j]!r} != cosinus moteur={ref!r} (écart {err:.3e})"

    sparsity = 1 - sum(1 for row in doc_rows_raw for v in row if v != 0.0) / (vocab_size * n_docs)

    lsa = build_embedding(G, G, n_docs, doc_vectors_l2, vocab, vocab_size)
    B = build_mds_dissimilarity(G, n_docs)
    mds = build_embedding(B, G, n_docs, doc_vectors_l2, vocab, vocab_size)

    chrono_rank = {s: r for r, s in enumerate(sorted(ANNEES, key=ANNEES.get))}

    documents = []
    for i in range(n_docs):
        s = stem(noms_fichiers[i])
        pairs = sorted(((vocab[j], doc_vectors_l2[i][j]) for j in range(vocab_size) if doc_vectors_l2[i][j] != 0.0),
                        key=lambda p: p[1], reverse=True)
        with open(os.path.join(SPEECHES_DIR, noms_fichiers[i]), "r", encoding="utf-8") as f:
            raw_text = f.read()
        documents.append({
            "name": noms_fichiers[i],
            "label": f"{NOMS_AFFICHES[s]} · {ANNEES[s]}",
            "hue": PALETTE_CHRONO[chrono_rank[s]],
            "year": ANNEES[s],
            "norm_before_l2": math_vect.calculer_norme_vecteur(doc_rows_raw[i]),
            "top_terms": [[w, w_val] for w, w_val in pairs[:TOP_TERMS_PAR_DOC]],
            "vector_sparse": {str(j): doc_vectors_l2[i][j] for j in range(vocab_size) if doc_vectors_l2[i][j] != 0.0},
            "raw_text": raw_text,
        })

    os.makedirs(OUT_DIR, exist_ok=True)
    corpus_hash = hash_corpus(SPEECHES_DIR)

    data = {
        "meta": {
            "n_docs": n_docs,
            "vocab_size": vocab_size,
            "sparsity": sparsity,
            "idf_variant": idf_variant,
            "generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "corpus_hash": corpus_hash,
        },
        "vocab": vocab,
        "idf": idf,
        "documents": documents,
        "cosine_matrix": G,
        "embeddings": {
            "lsa": {k: v for k, v in lsa.items() if not k.startswith("_")},
            "mds": {k: v for k, v in mds.items() if not k.startswith("_")},
        },
    }

    if not quiet:
        with open(OUT_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    if quiet:
        print(f"{idf_variant} lsa_var={lsa['explained_variance']:.6f} lsa_dist={lsa['angular_distortion_deg']:.4f} "
              f"mds_var={mds['explained_variance']:.6f} mds_dist={mds['angular_distortion_deg']:.4f}")
    else:
        print(f"idf_variant         = {idf_variant}")
        print(f"n_docs              = {n_docs}")
        print(f"vocab_size          = {vocab_size}")
        print(f"sparsity            = {sparsity:.6f}")
        print(f"corpus_hash         = {corpus_hash[:16]}...")
        print(f"Gram vs moteur, ecart max = {max_gram_err:.3e}  (seuil 1e-9)")
        print(f"LSA  explained_variance   = {lsa['explained_variance']:.6f}   angular_distortion_deg = {lsa['angular_distortion_deg']:.4f}   jacobi_max_err = {lsa['_jacobi_max_err']:.3e}")
        print(f"MDS  explained_variance   = {mds['explained_variance']:.6f}   angular_distortion_deg = {mds['angular_distortion_deg']:.4f}   jacobi_max_err = {mds['_jacobi_max_err']:.3e}")
        print(f"ecrit : {OUT_PATH}")


if __name__ == "__main__":
    main()
