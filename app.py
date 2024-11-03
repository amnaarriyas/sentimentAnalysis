from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)  # Allow all origins by default

# Set up NLTK sentiment analysis
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data['text']

    # Perform sentiment analysis
    sentiment_scores = sia.polarity_scores(text)
    sentiment_score = sentiment_scores['compound']
    
    # Determine sentiment label
    if sentiment_score >= 0.05:
        label = 'positive'
    elif sentiment_score <= -0.05:
        label = 'negative'
    else:
        label = 'neutral'

    return jsonify({
        'compound': sentiment_score,
        'neg': sentiment_scores['neg'],
        'neu': sentiment_scores['neu'],
        'pos': sentiment_scores['pos'],
        'label': label,
        'score': sentiment_score
    })

if __name__ == '__main__':
    app.run(debug=True)
