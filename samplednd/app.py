from flask import Flask, request, render_template
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import re

# Initialize the Flask application
app = Flask(__name__)

# Step 1: Load the datasets
datasets = {
    "classes": pd.read_csv("classes.csv"),
    "equipment": pd.read_csv("equipment.csv"),
    "monsters": pd.read_csv("monsters.csv"),
    "races": pd.read_csv("races.csv"),
    "spells": pd.read_csv("spells.csv"),
}

# Step 2: Preprocess and combine data
# Extract relevant columns and prepare text-queryable data
data_frames = []
for category, df in datasets.items():
    df = df.astype(str)  # Ensure all data is string type
    df['category'] = category  # Add a category column
    df['combined_text'] = df.apply(lambda x: ' '.join(x), axis=1)  # Combine all columns into one text field
    data_frames.append(df[['combined_text', 'category']])

# Combine all datasets into one DataFrame
combined_data = pd.concat(data_frames, ignore_index=True)

# Step 3: Preprocess text data
combined_data['cleaned_text'] = combined_data['combined_text'].str.lower().str.replace(r'[^a-z\s]', '', regex=True)
X = combined_data['cleaned_text']
y = combined_data['category']

# Step 4: TF-IDF vectorization
vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
X_vec = vectorizer.fit_transform(X)

# Step 5: Initialize and train the Naive Bayes model
nb_model = MultinomialNB()
nb_model.fit(X_vec, y)

# Step 6: Define a function to predict category and retrieve relevant info
def predict_category_and_info(query_text):
    # Clean and vectorize the input text
    cleaned_text = re.sub(r'[^a-z\s]', '', query_text.lower())
    vectorized_text = vectorizer.transform([cleaned_text])

    # Predict the category
    predicted_category = nb_model.predict(vectorized_text)[0]

    # Retrieve the most relevant entries from the predicted category
    relevant_df = datasets[predicted_category]
    relevant_info = relevant_df.iloc[0:5].to_dict(orient='records')  # Return the first 5 rows as a preview

    return predicted_category, relevant_info


# Initialize an empty list to store user interactions
user_interactions = []


@app.route('/')
def index():
    return render_template('index.html', user_interactions=user_interactions)


@app.route('/chat', methods=['POST'])
def chat():
    # Get user input
    user_input = request.form.get('user_input', '')

    # Predict category and retrieve relevant info
    predicted_category, relevant_info = predict_category_and_info(user_input)

    # Append the user interaction to the list
    user_interactions.append((user_input, predicted_category, relevant_info))

    # Render the updated chat interface
    return render_template(
        'index.html',
        user_interactions=user_interactions,
    )


# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
