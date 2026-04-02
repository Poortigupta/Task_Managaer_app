# AI Guidance & Usage

Throughout this project, I utilized an AI assistant (Gemini) as a pair-programming partner and architectural sounding board. 

**How AI was leveraged:**
1. **Architecture Planning:** Used AI to brainstorm standard, production-ready folder structures for Flask, moving away from a simple `app.py` script to a Blueprint/Application Factory model.
2. **Boilerplate Generation:** Generated repetitive boilerplate code for SQLAlchemy models and basic CRUD routes to accelerate development.
3. **Debugging:** Used AI to diagnose and resolve a specific environment variable bug and an NPM `EJSONPARSE` dependency mismatch error between Vite 8 and Node.js v20.17.
4. **UI Ideation:** Consulted AI for best practices on implementing a lightweight, pure-CSS dark mode toggle without relying on external component libraries.

**Constraints & Coding Standards Enforced:**
* Directed the AI to avoid overly complex utilities (like Marshmallow schemas) in favor of readable, native Flask JSON responses to keep the scope appropriate for the assignment.
* Maintained strict separation between frontend (`localhost:5173`) and backend (`localhost:5000`), proxying requests rather than serving React from Flask.