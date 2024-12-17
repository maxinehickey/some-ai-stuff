# main script for running website

from package_manager import install_nec_packages, required_packages
install_nec_packages(required_packages)

import sqlite3
from flask import Flask, render_template, request, jsonify
from prediction_engine import default_words, get_next_pred_words
from ai_foundation import generate_response, get_tts, save_audio

# ___ initialize flask backend ___
app = Flask(__name__)
app.static_folder = "static"

# ___ initialize variables needed to store important information (prompts/pred. words) ___
pred_word_1, pred_word_2, pred_word_3, pred_word_4 = default_words[0], default_words[1], default_words[2], default_words[3]
user_prompt = None
generated_response = None

# predictions/tts enable status by default
predictions_on = True
tts_on = False

# initialize database for storing user input/output, if not already existing
conn = sqlite3.connect('usage_data.db')
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS input_output_table (
               user_input TEXT,
               model_output TEXT
    )
               """)

conn.commit()
cursor.close()
conn.close()

# ___ this section simply manages the pages on the website, renders each when linked to ___

# main/home page
@app.route("/", methods=['GET', 'POST'])
@app.route("/home.html", methods=['GET', 'POST'])
def home():  
    global pred_word_1, pred_word_2, pred_word_3, pred_word_4
    pred_word_1, pred_word_2, pred_word_3, pred_word_4 = default_words[0], default_words[1], default_words[2], default_words[3]
    if request.method == "POST":
        # get and store user input from textbox
        _user_prompt = request.form["user-prompt"]
        store_prompt(_user_prompt)

        # get and store model output
        _generated_response = generate_response(_user_prompt)
        store_generated_response(_generated_response)

        # if enabled by user, get tts generation and save audio file for later access
        if tts_on:
            model_output_tts = get_tts(_generated_response)
            save_audio(model_output_tts)

        print("\nUser Submission:", _user_prompt, "\n")
        print("\nModel Output:", _generated_response, "\n")

        # record user input and generated output in usage_data database
        conn = sqlite3.connect('usage_data.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO input_output_table (user_input, model_output) VALUES (?, ?)', (_user_prompt, _generated_response))
        conn.commit()
        cursor.close()
        conn.close()

        pass
    return render_template("home.html",
                           user_prompt = user_prompt,
                           pred_word_1 = pred_word_1,
                           pred_word_2 = pred_word_2,
                           pred_word_3 = pred_word_3,
                           pred_word_4 = pred_word_4,
                           predictions_on = predictions_on,
                           tts_on = tts_on,
                           generated_response = generated_response)

# about page
@app.route("/about.html")
def about():
    return render_template("about.html")

# FAQ page
@app.route("/faq.html")
def faq():
    return render_template("faq.html")

# resources page
@app.route("/resources.html")
def resources():
    return render_template("resources.html")

# ___ these functions pertain to the actual predictions and behaviors of website tools ___
# just updates the global prompt string variable to the most recent prompt from the user, to be passed to model and saved
def store_prompt(_user_prompt):
    global user_prompt
    user_prompt = _user_prompt

def store_generated_response(_generated_response):
    global generated_response
    generated_response = _generated_response

list_of_new_words = ["like", "know", "love", "think"]

# fetches prediction words when clicked
@app.route("/refresh_predicted_words", methods=["post"])
def refresh_predicted_words():
    global pred_word_1, pred_word_2, pred_word_3, pred_word_4

    pred_word = request.form["pred_word"]
    list_of_new_words = get_next_pred_words(pred_word)

    pred_word_1, pred_word_2, pred_word_3, pred_word_4 = list_of_new_words[0], list_of_new_words[1], list_of_new_words[2], list_of_new_words[3]
    return jsonify({'status': 'success',
                    'pred_word_1': pred_word_1,
                    'pred_word_2': pred_word_2,
                    'pred_word_3': pred_word_3,
                    'pred_word_4': pred_word_4})

# toggle on/off prediction via checkbox
@app.route('/pred_on_off', methods=['POST'])
def pred_on_off():
    global predictions_on
    predictions_on = request.form.get('predictions_on') == 'true'
    return jsonify({'status': 'success', 'predictions_on': predictions_on})

# toggle on/off tts via checkbox
@app.route('/tts_on_off', methods=['POST'])
def tts_on_off():
    global tts_on
    tts_on = request.form['tts_on'] == 'true'
    return jsonify({'status': 'success', 'tts_on': tts_on})


if __name__ == "__main__":
    app.run(debug=True)

