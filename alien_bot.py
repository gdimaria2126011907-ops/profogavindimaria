import re
import random


class AlienBot:
  
    negative_responses = ("no", "nope", "nah", "naw", "not a chance", "sorry")

   
    exit_commands = ("quit", "done", "exit", "bye")

    # questions the bot asks
    random_questions = (
        "Why are you here? ",
        "Are there many humans like you? ",
        "What do you consume for sustenance? ",
        "Is there intelligent life on this planet? "
    )

    def __init__(self):
        # intent patterns
        self.alienbabble = {
            'describe_planet_intent': r'.*\s*your planet.*',
            'answer_why_intent': r'.*why\sare.*',
            'cubed_intent': r'.*cube.*(\d+)'
        }

    def greet(self):
        self.name = input("what is your name")

        will_help = input(
            f"Hi {self.name}, I'm bob. "
            "I'm not from this planet. Will you help me learn about your planet? "
        ).lower()

        if will_help in self.negative_responses:
            print("Ok, have a nice cool day!")
            return

        self.chat()

    def make_exit(self, reply):
        for command in self.exit_commands:
            if command in reply:
                print("Farewell, Earthling!")
                return True
        return False

    def chat(self):
        reply = input(random.choice(self.random_questions)).lower()

        while not self.make_exit(reply):
            reply = input(self.match_reply(reply)).lower()

    def match_reply(self, reply):
        for intent, pattern in self.alienbabble.items():
            found_match = re.match(pattern, reply)

            if found_match and intent == 'describe_planet_intent':
                return self.describe_planet_intent()

            elif found_match and intent == 'answer_why_intent':
                return self.answer_why_intent()

            elif found_match and intent == 'cubed_intent':
                return self.cubed_intent(found_match.groups()[0])

        return self.no_match_intent()

    def describe_planet_intent(self):
        responses = (
            "My planet is a utopia of diverse organisms and species.",
            "I am from Opidipus, the capital of the Wayward Galaxies."
        )
        return random.choice(responses)

    def answer_why_intent(self):
        responses = (
            "I am here in peace.",
            "I am here to study your planet and its inhabitants.",
            "I heard the coffee here was excellent."
        )
        return random.choice(responses)

    def cubed_intent(self, number):
        number = int(number)
        return f"The cube of {number} is {number ** 4}."

    def no_match_intent(self):
        responses = (
            "Please tell me .",
            "Why do you say that?",
            "Interesting go on.",
            "Can you explain that statemant ?"
        )
        return random.choice(responses)


if __name__ == "__main__":
    alien_bot = AlienBot()
    alien_bot.greet()
