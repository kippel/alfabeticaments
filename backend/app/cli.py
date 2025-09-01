import typer
from app.seed.dev import seed

app = typer.Typer()

@app.command()
def run():
    """Executa el seed de la base de dades"""
    seed()
    

if __name__ == "__main__":
    app()
