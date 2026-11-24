"""Build a JSON list of 5-letter words from the Portuguese dictionary.

Each entry is {"word": "lábio", "unicode": "labio"}.

Verbs are kept only in the infinitive. Finite forms, the personal infinitive,
the gerund and the participle are dropped, unless the same spelling is also
a non-verbal entry (noun, adjective, and so on). Proper nouns are dropped
unless the same spelling is also a common entry.
"""

import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DIC_PATH = Path(__file__).resolve().parent / "pt_PT.dic"
OUT_PATH = ROOT / "src" / "lib" / "wordle" / "dictionary.json"


def parse_features(morph: str) -> dict[str, str]:
    """Parse a jspell morphological field, letting later keys override earlier ones."""
    inner = morph.strip()
    if inner.startswith("[") and inner.endswith("]"):
        inner = inner[1:-1]

    features: dict[str, str] = {}
    for part in inner.split("$"):
        if "=" not in part:
            continue
        for item in part.split(","):
            if "=" not in item:
                continue
            key, value = item.split("=", 1)
            features[key] = value
    return features


def is_conjugated_verb(features: dict[str, str]) -> bool:
    """True when this reading is a verb that is not the plain infinitive."""
    if features.get("CAT") != "v":
        return False
    return features.get("T") != "inf" or "P" in features


def is_proper_noun(features: dict[str, str]) -> bool:
    """True when this reading is a proper noun."""
    return features.get("CAT") == "np"


def is_five_letter_word(word: str) -> bool:
    return len(word) == 5 and word.isalpha()


def to_unicode(word: str) -> str:
    """Strip accents so "lábio" becomes "labio"."""
    return "".join(
        char
        for char in unicodedata.normalize("NFD", word)
        if unicodedata.category(char) != "Mn"
    )


def collect_words(dic_path: Path) -> list[dict[str, str]]:
    accepted: set[str] = set()

    for index, line in enumerate(dic_path.read_text(encoding="utf-8").splitlines()):
        if index == 0 and line.strip().isdigit():
            continue
        if not line.strip():
            continue

        left, _, morph = line.partition("\t")
        word = left.split("/", 1)[0].strip().lower()
        if not is_five_letter_word(word):
            continue
        features = parse_features(morph)
        if is_conjugated_verb(features) or is_proper_noun(features):
            continue
        accepted.add(word)

    entries = [{"word": word, "unicode": to_unicode(word)} for word in accepted]
    return sorted(entries, key=lambda entry: (entry["unicode"], entry["word"]))


def main() -> None:
    words = collect_words(DIC_PATH)
    OUT_PATH.write_text(
        json.dumps(words, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"{len(words)} words -> {OUT_PATH}")


if __name__ == "__main__":
    main()
