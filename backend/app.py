from datetime import datetime
from flask import Flask, session, request, url_for, redirect, jsonify, make_response, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config['SECRET_KEY'] = 'alamin101'
db = SQLAlchemy(app)

frontend_url = 'https://mdalamin19.pythonanywhere.com'

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(60), nullable=False)
    username = db.Column(db.String(60), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    date = db.Column(db.String, default=datetime.utcnow())


class Datas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    time = db.Column(db.String(60), nullable=False)



# Time date for mane
time_now = {
    'hour': 0,
    'minute': 0,
    'second': 0,
    'formate': ''
}

def set_time():
    time = datetime.now()
    time_now['hour'] = time.hour + 6
    time_now['minute'] = time.minute
    time_now['second'] = time.second
    time_now['formate'] = "AM"
    if time_now['hour'] > 12:
        time_now['hour'] = time_now['hour'] - 12
        time_now['formate'] = "PM"





# fixing cors
def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response



def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response




@app.route('/')
def hello_world():
    return render_template('index.html')



@app.route('/home')
def home():
    try:
        store_task(session['id'])
        return redirect(f"{frontend_url}")
    except:
        return redirect(f'{frontend_url}/#/login')







# Registerring new account
@app.route('/newdata', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        try:
            fname = validate_string(request.form['fname'])
            username = validate_string(request.form['username'])
            password = validate_string(request.form['password'])
            con_password = validate_string(request.form['con-password'])

            if Users.query.filter_by(username=username).first():
                return error_message('User name is takken')



            if password == con_password:
                newUser= Users(fullname=fname, username=username, password=password)
                db.session.add(newUser)
                db.session.commit()
                return redirect(url_for('home'))
            else:
                return error_message('Passowrd do not match')

        except:
            return error_message("somesiong very bad")

    return redirect('/register')



# Loggin to account
@app.route('/login-data', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        try:
            cur_username = Users.query.filter_by(username = request.form['username']).first()
            if cur_username.password == request.form['password']:
                session['id'] = cur_username.id
                session['name'] = cur_username.fullname
                return redirect(url_for('home'))
            else:
                return error_message("Username and password not match")

        except:
            return error_message("No account found!")


# Logout from account
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))




# Home data route for front end data
@app.route('/home-data')
def home_data():
    set_time()
    return build_actual_response(jsonify({
            'id': session['id'],
            'name': session['name'],
            'time_now': time_now,
            'tasks': session['tasks'] if 'tasks' in session else "",
        }))




# stored data to server
@app.route('/data', methods=['POST', 'GET'])
def data():
    if request.method == 'POST':
        try:
            user_task = validate_string(request.form['taskname'])
            user_task_time = validate_string(request.form['tasktime'])
            if session['id']:
                cur_task = Datas(
                    content=user_task,
                    user_id=session['id'],
                    time=user_task_time,
                )
                db.session.add(cur_task)
                db.session.commit()
                return redirect(url_for('home'))
        except:
            return error_message("Cant upload the data")




# func to stroing data to show on frontend
def store_task(id):
    all_tasks = []
    user_alldata = Datas.query.filter_by(user_id=id).all()
    for data in user_alldata:
        all_tasks .append({
            'taskId': data.id,
            'text': data.content,
            'time': data.time
        })

    session['tasks'] = all_tasks






#deleting data
@app.route('/delete-data/<int:id>')
def delete_data(id):
    try:
        d_data = Datas.query.filter_by(id=id).first()
        db.session.delete(d_data)
        db.session.commit()
        return redirect(url_for('home'))

    except:
        return error_message("Something bad")





# Delete account
@app.route('/delete-accout/<int:id>')
def delete_acc(id):
    try:
        if session['id'] == id:
            # deleting datas
            d_datas = Datas.query.filter_by(user_id=id).all()
            for data in d_datas:
                db.session.delete(data)
                db.session.commit()

            # deleteing account
            d_acc = Users.query.filter_by(id=id).first()
            db.session.delete(d_acc)
            db.session.commit()
            session.clear()
            return redirect(url_for('home'))
    except:
        return error_message("Something went wrong deleteing the accoutn")




# showing error message fucntion
def error_message(s):
    session['erorr-text'] = s
    return redirect(frontend_url +'/#/erorr')



# Error code
@app.route('/error-text')
def erorr():
    try:
        return build_actual_response(jsonify({ 'text': session['erorr-text'] }))
    except:
        return None



# validating empty string
def validate_string(s):
    if len(s) < 1 or s == " ":
        return None
    elif s == " " * len(s):
        return None
    else:
        return s


