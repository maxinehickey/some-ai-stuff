# This script contains functions and variables necessary for driving next word prediction

from transformers import pipeline

default_words = ["I", "You", "We", "This"]

# takes previous prediction, passes it to language model to generate a new set of words
def get_next_pred_words(prev_pred):
    next_preds = generate_next_words(prev_pred)
    return next_preds

# using same model for text generation per user prompt
llm_name = "EleutherAI/pythia-70m-deduped" 

generator = pipeline('text-generation',
                     model=llm_name)

# generates new list of prediction words via sampling from language model output
def generate_next_words(word):
    generator.tokenizer.pad_token_id = generator.model.config.eos_token_id

    output = generator([word]*5,
            batch_size = 64,
            do_sample = True,
            max_length = 5,
            temperature = 3.0,
            return_full_text = True)

    output = [x[0]["generated_text"] for x in output]
 
    return [output[i].split()[-1] for i in range(len(output)) ]