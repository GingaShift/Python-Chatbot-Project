"""Configuration visuelle et petites règles testables de l'interface."""

COLORS = {
    "background": "#0B1220",
    "surface": "#111C2E",
    "surface_alt": "#17243A",
    "border": "#263750",
    "text": "#F5F7FB",
    "muted": "#9DABC0",
    "accent": "#D94B5B",
    "accent_hover": "#EE6271",
    "answer": "#E8EEF7",
}

QUICK_QUESTIONS = (
    "Quels sont les mots les moins importants du corpus ?",
    "Quels sont les mots les plus importants du corpus ?",
    "Quels mots significatifs Jacques Chirac répète-t-il le plus ?",
    "Quels présidents ont parlé de la Nation, et lequel le plus ?",
    "Quel président a parlé du climat ou de l’écologie ?",
)

QUICK_LABELS = (
    "Mots secondaires du corpus",
    "Mots majeurs du corpus",
    "Les mots favoris de Chirac",
    "La Nation dans le corpus",
    "Climat et écologie",
)


def question_number(question):
    """Retourne le numéro attendu par le moteur historique (base 1)."""
    try:
        return QUICK_QUESTIONS.index(question) + 1
    except ValueError as exc:
        raise ValueError("Question rapide inconnue") from exc


def validate_question(question):
    """Normalise une question utilisateur et refuse une saisie vide."""
    cleaned = question.strip()
    if not cleaned:
        raise ValueError("Veuillez saisir une question avant de l’envoyer.")
    return cleaned
