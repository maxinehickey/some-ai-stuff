**this is a simple ai model**

this is a flask-based chatbot application for answering questions related to Dungeons & Dragons (DnD) using data from CSV files (just bc i didn't know anything about dnd or your specific campaign). the chatbot provides predictions and relevant information on topics such as classes, equipment, monsters, races, and spells

features:
- text classification: based on user queries, the chatbot predicts the category (e.g., classes, equipment) and provides relevant information
- flask web app: friendly ui for interacting with the chatbot
- data: the chatbot uses CSV data (`classes.csv`, `equipment.csv`, `monsters.csv`, `races.csv`, `spells.csv`) to fetch details and give responses

setup
1. clone the repo

2. install virtual env
python3 -m venv chatbot-env  # Creates a new virtual environment called 'chatbot-env'
source chatbot-env/bin/activate  # Activate the virtual environment (macOS/Linux)
chatbot-env\Scripts\activate  # Activate the virtual environment (Windows)

3. install dependencies
pip install flask pandas scikit-learn
pip install tensorflow-gpu (if you need gpu support)
pip install tensorflow (if you don't need gpu support)

4. make sure you have the following csv files in your dir
     - `classes.csv`
     - `equipment.csv`
     - `monsters.csv`
     - `races.csv`
     - `spells.csv`
   
  
running the app

1. in proj dir run
python app.py

2. access the chatbot
it will be running on http://127.0.0.1:5000/(Press CTRL+C to quit)