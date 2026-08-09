import tkinter as tk
from tkinter import messagebox

import customtkinter as ctk

import presidents as les_presidents
import string_manager as sm
import TF_IDF as tf_idf
import traitement_questions_reponses as tt_quest_rep
from ui_theme import COLORS, QUICK_LABELS, QUICK_QUESTIONS, question_number, validate_question


ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

window = None
question_input = None
answer_text = None
status_label = None


def center_window(root, width, height):
    x = max((root.winfo_screenwidth() - width) // 2, 0)
    y = max((root.winfo_screenheight() - height) // 2, 0)
    root.geometry(f"{width}x{height}+{x}+{y}")


def clear_answer():
    answer_text.delete("1.0", tk.END)


def show_status(text, color=None):
    status_label.configure(text=text, text_color=color or COLORS["muted"])


def traitement_question_sur_stat_mots_corpus(num_question):
    clear_answer()
    show_status("Analyse du corpus en cours…", COLORS["accent"])
    window.update_idletasks()
    reponse = tt_quest_rep.obtenir_reponse_sur_stats_mots_corpus(num_question)
    delay = 0.02 if num_question in (2, 3) else 0.05
    batch = 150 if num_question in (2, 3) else 50
    sm.afficher_texte_progressivement(reponse, answer_text, delay, batch)
    show_status("Réponse ancrée dans les discours du corpus")


def on_quick_question(question):
    question_input.delete(0, tk.END)
    question_input.insert(0, question)
    traitement_question_sur_stat_mots_corpus(question_number(question))


def traitement_question_utilisateur_et_affichage_reponse(question):
    clear_answer()
    show_status("Recherche du passage le plus pertinent…", COLORS["accent"])
    window.update_idletasks()
    reponse = tt_quest_rep.traitement_question_utilisateur(question)
    sm.afficher_texte_progressivement(reponse, answer_text)
    show_status("Réponse ancrée dans les discours du corpus")


def submit_question(event=None):
    try:
        question = validate_question(question_input.get())
    except ValueError as exc:
        show_status(str(exc), COLORS["accent_hover"])
        messagebox.showinfo("Question incomplète", str(exc))
        question_input.focus_set()
        return "break"
    traitement_question_utilisateur_et_affichage_reponse(question)
    return "break"


def new_question():
    question_input.delete(0, tk.END)
    clear_answer()
    show_status("Prêt à explorer le corpus")
    question_input.focus_set()


def make_suggestion(parent, number, label, question):
    button = ctk.CTkButton(
        parent,
        text=f"{number:02d}   {label}",
        command=lambda value=question: on_quick_question(value),
        height=58,
        corner_radius=12,
        anchor="w",
        fg_color="#17243A",
        hover_color="#223552",
        border_width=1,
        border_color="#263750",
        text_color="#DDE6F4",
        font=ctk.CTkFont("Segoe UI", 13),
    )
    button.pack(fill="x", pady=5)


def creer_ui():
    global window, question_input, answer_text, status_label

    window = ctk.CTk(fg_color="#080E19")
    window.title("NOVA — Explorateur de discours")
    center_window(window, 1180, 760)
    window.minsize(900, 650)
    window.grid_columnconfigure(1, weight=1)
    window.grid_rowconfigure(0, weight=1)

    sidebar = ctk.CTkFrame(window, width=340, corner_radius=0, fg_color="#0D1727")
    sidebar.grid(row=0, column=0, sticky="nsew")
    sidebar.grid_propagate(False)

    brand = ctk.CTkFrame(sidebar, fg_color="transparent")
    brand.pack(fill="x", padx=28, pady=(30, 24))
    ctk.CTkLabel(brand, text="N", width=42, height=42, corner_radius=12,
                 fg_color=COLORS["accent"], text_color="white",
                 font=ctk.CTkFont("Segoe UI", 20, "bold")).pack(side="left")
    brand_copy = ctk.CTkFrame(brand, fg_color="transparent")
    brand_copy.pack(side="left", padx=12)
    ctk.CTkLabel(brand_copy, text="NOVA", anchor="w", text_color="#F7F9FC",
                 font=ctk.CTkFont("Segoe UI", 17, "bold")).pack(fill="x")
    ctk.CTkLabel(brand_copy, text="RETRIEVAL ENGINE", anchor="w", text_color="#73839B",
                 font=ctk.CTkFont("Segoe UI", 9, "bold")).pack(fill="x")

    ctk.CTkFrame(sidebar, height=1, fg_color="#22314A").pack(fill="x", padx=28)
    ctk.CTkLabel(sidebar, text="EXPLORATIONS RAPIDES", anchor="w", text_color="#73839B",
                 font=ctk.CTkFont("Segoe UI", 10, "bold")).pack(fill="x", padx=28, pady=(24, 8))

    suggestions = ctk.CTkScrollableFrame(sidebar, fg_color="transparent",
                                         scrollbar_button_color="#293A56",
                                         scrollbar_button_hover_color="#3A4E6C")
    suggestions.pack(fill="both", expand=True, padx=(22, 12), pady=(0, 12))
    for index, (label, question) in enumerate(zip(QUICK_LABELS, QUICK_QUESTIONS), start=1):
        make_suggestion(suggestions, index, label, question)

    corpus_card = ctk.CTkFrame(sidebar, corner_radius=14, fg_color="#131F32",
                               border_width=1, border_color="#22314A")
    corpus_card.pack(fill="x", padx=28, pady=(8, 28))
    ctk.CTkLabel(corpus_card, text="CORPUS ACTIF", text_color="#73839B",
                 font=ctk.CTkFont("Segoe UI", 9, "bold")).pack(anchor="w", padx=16, pady=(13, 2))
    ctk.CTkLabel(corpus_card, text="8 discours  ·  6 présidents", text_color="#DDE6F4",
                 font=ctk.CTkFont("Segoe UI", 12, "bold")).pack(anchor="w", padx=16, pady=(0, 13))

    workspace = ctk.CTkFrame(window, corner_radius=0, fg_color="#080E19")
    workspace.grid(row=0, column=1, sticky="nsew", padx=0, pady=0)
    workspace.grid_columnconfigure(0, weight=1)
    workspace.grid_rowconfigure(1, weight=1)

    header = ctk.CTkFrame(workspace, fg_color="transparent")
    header.grid(row=0, column=0, sticky="ew", padx=42, pady=(34, 22))
    header.grid_columnconfigure(0, weight=1)
    ctk.CTkLabel(header, text="Les mots du pouvoir, enfin interrogeables.", anchor="w",
                 text_color="#F4F7FB", font=ctk.CTkFont("Segoe UI", 27, "bold")).grid(row=0, column=0, sticky="w")
    ctk.CTkLabel(header, text="Posez une question. NOVA retrouve le passage le plus proche dans le corpus.",
                 anchor="w", text_color="#8291A8", font=ctk.CTkFont("Segoe UI", 13)).grid(row=1, column=0, sticky="w", pady=(5, 0))
    ctk.CTkButton(header, text="＋  Nouveau", command=new_question, width=112, height=36,
                  corner_radius=18, fg_color="#141F31", hover_color="#22314A",
                  border_width=1, border_color="#293A56", text_color="#CBD6E7").grid(row=0, column=1, rowspan=2, padx=(20, 0))

    conversation = ctk.CTkFrame(workspace, corner_radius=22, fg_color="#101A2A",
                                border_width=1, border_color="#21314A")
    conversation.grid(row=1, column=0, sticky="nsew", padx=42, pady=(0, 18))
    conversation.grid_columnconfigure(0, weight=1)
    conversation.grid_rowconfigure(2, weight=1)

    answer_header = ctk.CTkFrame(conversation, fg_color="transparent")
    answer_header.grid(row=0, column=0, sticky="ew", padx=26, pady=(23, 0))
    ctk.CTkLabel(answer_header, text="N", width=34, height=34, corner_radius=10,
                 fg_color="#223552", text_color="#FF7A88",
                 font=ctk.CTkFont("Segoe UI", 15, "bold")).pack(side="left")
    identity = ctk.CTkFrame(answer_header, fg_color="transparent")
    identity.pack(side="left", padx=11)
    ctk.CTkLabel(identity, text="NOVA", text_color="#F4F7FB", anchor="w",
                 font=ctk.CTkFont("Segoe UI", 12, "bold")).pack(fill="x")
    status_label = ctk.CTkLabel(identity, text="Prêt à explorer le corpus", text_color="#8291A8",
                                anchor="w", font=ctk.CTkFont("Segoe UI", 10))
    status_label.pack(fill="x")

    ctk.CTkFrame(conversation, height=1, fg_color="#21314A").grid(row=1, column=0, sticky="ew", padx=26, pady=18)
    answer_text = ctk.CTkTextbox(conversation, corner_radius=12, fg_color="#0C1524",
                                 border_width=0, text_color="#E3EAF5",
                                 scrollbar_button_color="#2B3C58",
                                 scrollbar_button_hover_color="#3B506F",
                                 font=ctk.CTkFont("Segoe UI", 15), wrap="word",
                                 padx=18, pady=16)
    answer_text.grid(row=2, column=0, sticky="nsew", padx=26, pady=(0, 26))
    answer_text.insert("1.0", "Sélectionnez une exploration rapide ou posez votre propre question pour commencer.")

    composer = ctk.CTkFrame(workspace, height=82, corner_radius=22, fg_color="#141F31",
                            border_width=1, border_color="#2B3C58")
    composer.grid(row=2, column=0, sticky="ew", padx=42, pady=(0, 30))
    composer.grid_columnconfigure(0, weight=1)
    question_input = ctk.CTkEntry(composer, height=54, corner_radius=14, fg_color="transparent",
                                  border_width=0, text_color="#F3F6FA",
                                  placeholder_text="Posez une question sur les discours…",
                                  placeholder_text_color="#71819A",
                                  font=ctk.CTkFont("Segoe UI", 14))
    question_input.grid(row=0, column=0, sticky="ew", padx=(10, 4), pady=10)
    question_input.bind("<Return>", submit_question)
    send = ctk.CTkButton(composer, text="➜", command=submit_question, width=52, height=52,
                         corner_radius=16, fg_color=COLORS["accent"],
                         hover_color=COLORS["accent_hover"], text_color="white",
                         font=ctk.CTkFont("Segoe UI Symbol", 20, "bold"))
    send.grid(row=0, column=1, padx=(4, 12), pady=10)

    window.bind("<Control-n>", lambda _event: new_question())
    window.bind("<Control-q>", lambda _event: window.destroy())
    question_input.focus_set()
    window.mainloop()


def main():
    tf_idf.ini += 1
    if tf_idf.ini == 2:
        return

    les_presidents.liste_noms_fichiers_discours_presidents = les_presidents.obtenir_nom_fichiers_discours_presidents(
        les_presidents.dossier_discours_presidents)
    les_presidents.nombre_docs_fichiers_discours_presidents = len(
        les_presidents.liste_noms_fichiers_discours_presidents)
    les_presidents.remplir_dico_fichiers_discours_presidents_depuis_la_liste(
        les_presidents.liste_noms_fichiers_discours_presidents)
    les_presidents.obtenir_liste_prenom_nom_des_presidents(
        les_presidents.liste_noms_fichiers_discours_presidents)
    sm.convertir_texte_en_minuscules(
        les_presidents.liste_noms_fichiers_discours_presidents,
        les_presidents.dossier_discours_presidents_nettoyes)
    sm.nettoyer_textes_du_dossier(les_presidents.dossier_discours_presidents_nettoyes)
    tf_idf.les_dicos_occurrences_mots_corpus = tf_idf.creer_tous_les_dicos_occurrences_mots(
        les_presidents.dossier_discours_presidents_nettoyes)
    tf_idf.matrice_tf_corpus = tf_idf.creer_matrice_tf(tf_idf.les_dicos_occurrences_mots_corpus)
    tf_idf.matrice_idf_corpus = tf_idf.creer_matrice_idf(
        les_presidents.dossier_discours_presidents_nettoyes)
    tf_idf.matrice_tf_idf_corpus = tf_idf.creer_matrice_tf_idf(
        les_presidents.dossier_discours_presidents_nettoyes,
        tf_idf.les_dicos_occurrences_mots_corpus,
        tf_idf.matrice_tf_corpus,
        tf_idf.matrice_idf_corpus)
    tf_idf.matrice_tf_idf_corpus_transposee = tf_idf.transpose_matrice(
        tf_idf.matrice_tf_idf_corpus)
    tt_quest_rep.remplir_dico_intro_avant_reponse_trouvee()
    creer_ui()


if __name__ == "__main__":
    main()
