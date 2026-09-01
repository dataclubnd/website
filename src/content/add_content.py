import json
import os

def main():
    option = input("Enter p to add project, e to add event: ")

    if option == "p":
        image = input("Enter the name of the image file inside src/content/assets: ")
        title = input("Project title (recommended to include company and mini title description e.g. Aunalytics: SQL to NL conversion with LLM): ")
        desc = input("Project description: ")
        year = input("Project Year (YYYY): ")
        term = input("Project term (Fall|Spring): ")
        link = input("Project link to see result: ")

        project = {
            "image": image,
            "title": title,
            "description": desc,
            "year": year,
            "term": term,
            "link": link
        }

        # Check if projects.json exists, if not create it
        if not os.path.exists("projects.json"):
            with open("projects.json", "w") as f:
                json.dump([], f)

        # Read existing data, handle empty file, append new project, and write back
        with open("projects.json", "r") as f:
            try:
                projects = json.load(f)
            except json.JSONDecodeError:
                projects = []

        projects.append(project)

        with open("projects.json", "w") as f:
            json.dump(projects, f, indent=4)

        print("Project added successfully!")

    elif option == "e":
        title = input("Event title: ")
        desc = input("Event description: ")
        location = input("Event location: ")
        time = input("Event time YYYY-MM-DDTHH:MM e.g. 2026-08-19T16:30 = Aug 19 2026 4:30pm: ")
        link = input("Event link (if there is one): ")

        event = {
            "title": title,
            "description": desc,
            "location": location,
            "time": time,
            "link": link
        }

        # Check if events.json exists, if not create it
        if not os.path.exists("events.json"):
            with open("events.json", "w") as f:
                json.dump([], f)

        # Read existing data, handle empty file, append new event, and write back
        with open("events.json", "r") as f:
            try:
                events = json.load(f)
            except json.JSONDecodeError:
                events = []

        events.append(event)

        with open("events.json", "w") as f:
            json.dump(events, f, indent=4)

        print("Event added successfully!")

    else:
        print("Error, select p or e")
        exit(1)

if __name__ == "__main__":
    main()