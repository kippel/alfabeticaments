from gtts import gTTS
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
'''
    hora_expressio: "Les dues"
    hora_voice_mp3: "/mp3/ca/les-dues.mp3"
'''
def hora_gtts(hora_expressio: str, hora_voice_mp3: str):
    # Eliminar / inicial si hi és
    rel_path = hora_voice_mp3.lstrip("/")

    # Carpeta base mp3/ca dins del projecte
    ruta_sortida = os.path.join(BASE_DIR, rel_path)

    # Crear directoris si no existeixen
    os.makedirs(os.path.dirname(ruta_sortida), exist_ok=True)

    # Generar veu
    tts = gTTS(hora_expressio, lang='ca')
    tts.save(ruta_sortida)
    return ruta_sortida