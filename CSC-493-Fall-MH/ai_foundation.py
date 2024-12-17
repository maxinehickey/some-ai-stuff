# This script contains the majority of the programming behind AI text generation functionality

from transformers import pipeline
from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write
import re

preload_models()

llm_name = "EleutherAI/pythia-160m-deduped"  # main language model
# sam_name = "cardiffnlp/twitter-roberta-base-sentiment-latest"  # model for measuring sentiment
# ep_name = "cardiffnlp/twitter-roberta-base-emoji"  # model for emoji prediction


generator = pipeline('text-generation',
                     model=llm_name)

# sentiment_analysis = pipeline("sentiment-analysis",
#                               model=ep_name)

batch_size = 2
max_tokens = 128
temp = 1.0

# generate responses using 
def generate_response(prompt):
    master_prompt = "Q: tired. A: I'm so exhausted. I feel like I carry a huge weight on my shoulders. Q: happy. A: I am filled to the brim with jubilation right now! I feel like I'm on the moon! Q: I'm annoyed. A: Ugh, this is really ticking me off! Q: {p}. A:".format(p=prompt)
    generator.tokenizer.pad_token_id = generator.model.config.eos_token_id

    output = generator(master_prompt,
            batch_size = 64,
            do_sample = True,
            max_length = 128,
            temperature = 2.0,
            return_full_text = True)

    output = [x["generated_text"] for x in output]
    output = output[0].split("\n")
    answer = output[0].find("Q: {p}. A:".format(p=prompt))
    
    return output[0][answer + len("Q: {p}. A:".format(p=prompt)):]

def get_tts(text_prompt):
    audio_array = generate_audio(text_prompt)
    return audio_array

def save_audio(audio_array):
    file_path = "static/generated_tts/output.wav"
    write(file_path, SAMPLE_RATE, audio_array)

