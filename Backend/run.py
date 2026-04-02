from app import create_app

app = create_app()

if __name__ == '__main__':
    # debug=True automatically restarts the server when you save a file
    app.run(debug=True)