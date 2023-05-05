import math
import random
from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def home_call():
    return render_template('homePage.html')


#@app.route('/dragitems', methods=['GET'])
#def create_simulation():
#    return render_template('SimulationPage.html')


@app.route('/help', methods=['GET'])
def help_call():
    return render_template('helpPage.html')


@app.route('/contact', methods=['GET'])
def contact_call():
    return render_template('contact.html')


@app.route('/dragitems', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        Mu=0
        Lam=0
        entityC=0
        for key, mu in request.form.items():
            if key.startswith("server"):
                print(mu)
                Mu=mu
        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                Lam=lam
                entityC=entityCount
                print(lam, entityCount)

        return render_template('simulation_mm1l.html', Mu=Mu, Lam=Lam)
    else:
        return render_template('SimulationPage.html')


@app.route('/input', methods=['GET', 'POST'])
def get_inputs():
    if request.method == 'POST':
        # Get the values of numberOfEntities, lambda, and mu from the POST request
        numberOfEntities = request.form['numberOfEntities']
        lamda = request.form['lambda']
        mu = request.form['mu']

        # Convert the values to integers and floats
        numberOfEntities = int(numberOfEntities)
        lamda = float(lamda)
        mu = float(mu)

        # Calculate the MQL values
        mql_values = calculate_mql(numberOfEntities, lamda, mu)
        entities_list = []
        for i in range(numberOfEntities):
            entities_list.append(i)
        return render_template('simulation_mm1.html', mql_values=mql_values, entities_list=entities_list)

    else:
        return render_template('inputPage.html')


def calculate_mql(Number_of_Entities, lamda, mue):
    time_Arrival = 0
    Iat = -1 / lamda * math.log(random.random())
    Start_Serving = 0
    entity_list = []
    finish_Time = Start_Serving + mue
    waiting = 0
    total_waiting_time = 0
    finish_list = []
    MQL_analytic_list = []
    mql_list = []
    mql = 0
    for i in range(int(Number_of_Entities)):
        time_Arrival += Iat
        # print("time_Arrival:", time_Arrival)
        Iat = -(1 / lamda) * math.log(random.random())
        # print("IAT : ", Iat)
        Start_Serving = max(time_Arrival, finish_Time)
        # print("Start_Serving: ", Start_Serving)
        St = -(1 / mue) * math.log(random.random())
        # print("St: ", St)
        finish_Time = Start_Serving + St
        entity_list.append(i)
        finish_list.append(finish_Time)
        waiting = finish_Time - time_Arrival
        # print("Waiting: ", waiting)
        mql += waiting
        mql_list.append(mql / finish_Time)
        total_waiting_time += waiting

    return mql_list

if __name__ == '__main__':
    app.run()
