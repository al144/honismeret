#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import webbrowser  # Ezt add hozzá
import threading   # Ezt add hozzá

def open_browser():
    """Megnyitja a böngészőt a helyi szerver címén."""
    # Adunk egy kis időt (1.5 mp) a szervernek, hogy ténylegesen elinduljon
    webbrowser.open("http://127.0.0.1:8000")

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'honismeret.settings')
    
    # Csak akkor nyissa meg a böngészőt, ha a 'runserver' parancs fut
    # és nem a 'reload' folyamat (így nem nyit meg 10 ablakot fejlesztéskor)
    if 'runserver' in sys.argv and os.environ.get('RUN_MAIN') != 'true':
        threading.Timer(1.5, open_browser).start()

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'honismeret.settings')
    
    # JAVÍTÁS: Ha nincs megadva alparancs (mint a runserver), adjuk hozzá automatikusan
    if len(sys.argv) == 1:
        sys.argv.append('runserver')
        sys.argv.append('127.0.0.1:8000')
        sys.argv.append('--noreload') # Fontos: .exe-ben ne legyen auto-reload!

    # A böngészőnyitó kódod maradjon itt, amit az előbb megbeszéltünk:
    if 'runserver' in sys.argv and os.environ.get('RUN_MAIN') != 'true':
        threading.Timer(1.5, open_browser).start()

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # ... hibakezelés ...
        raise
    execute_from_command_line(sys.argv)