import unittest

from ui_theme import QUICK_LABELS, QUICK_QUESTIONS, question_number, validate_question


class UiThemeTests(unittest.TestCase):
    def test_each_quick_question_has_a_compact_navigation_label(self):
        self.assertEqual(len(QUICK_LABELS), len(QUICK_QUESTIONS))
        self.assertTrue(all(len(label) <= 32 for label in QUICK_LABELS))

    def test_question_number_uses_human_friendly_one_based_index(self):
        self.assertEqual(question_number(QUICK_QUESTIONS[0]), 1)
        self.assertEqual(question_number(QUICK_QUESTIONS[-1]), len(QUICK_QUESTIONS))

    def test_unknown_quick_question_is_rejected(self):
        with self.assertRaises(ValueError):
            question_number("Question inconnue")

    def test_validate_question_strips_surrounding_whitespace(self):
        self.assertEqual(validate_question("  Quel président parle du climat ?\n"),
                         "Quel président parle du climat ?")

    def test_validate_question_rejects_blank_input(self):
        with self.assertRaises(ValueError):
            validate_question("  \n\t")


if __name__ == "__main__":
    unittest.main()
