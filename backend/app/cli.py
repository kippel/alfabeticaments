import typer   
from app.seed.run_app import seed as run_seed
from app.seed.dev_app import seed as dev_seed

app = typer.Typer()

@app.command()
def run():
    # Call the synchronous entrypoint that runs the async production seeder.
    run_seed()

@app.command()
def dev():
    # Call the synchronous entrypoint that runs the async seeder.
    dev_seed()
    

if __name__ == "__main__":
    app()