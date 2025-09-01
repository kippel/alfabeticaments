


def serializes(bar: dict) -> dict:
    """Converteix l'_id de MongoDB a string per JSON."""
    return {**bar, "_id": str(bar["_id"])}