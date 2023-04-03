import math
import random
from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def home_call():
    return render_template('homePage.html')


@app.route('/dragitems', methods=['GET'])
def create_simulation():
    return render_template('SimulationPage.html')


@app.route('/help', methods=['GET'])
def help_call():
    return render_template('helpPage.html')


@app.route('/contact', methods=['GET'])
def contact_call():
    return render_template('contact.html')


@app.route('/input', methods=['GET', 'POST'])
def get_inputs():
    if request.method == 'POST':
        # Get the values of numberOfEntities, lambda, and mu from the POST request
        # array = request.form['lambda'].split(',')
        # lamda = array[0]
        # numberOfEntities = array[1]
        lamda = request.form['lambda']
        numberOfEntities = request.form['numberOfEntities']
        mu = request.form['mu']
        # Convert the values to integers and floats
        numberOfEntities = int(numberOfEntities)
        lamda = float(lamda)
        mu = float(mu)
        queue_size = request.form['queueSize']
        # Calculate the MQL values
        mql_values = calculate_mql(numberOfEntities, lamda, mu)
        entities_list = []
        for i in range(numberOfEntities):
            entities_list.append(i)
        outputs_list = calculateoutputs(lamda, mu, queue_size)
        return render_template('simulation.html', mql_values=mql_values, entities_list=entities_list)
        #render_template('simulatemm1l.html', outputs_list=outputs_list)

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


def calculateoutputs(lamda, mue, queue_size):
    Outputs_arr = []
    Traffic_intensity = lamda / mue
    Average_number_of_customers = Traffic_intensity / (1 - Traffic_intensity)
    Average_system_time = Average_number_of_customers / lamda
    Number_customers_queue = Average_number_of_customers * Traffic_intensity

    if queue_size > Number_customers_queue:

        Queue_time = Number_customers_queue / lamda

    else:
        Queue_time = queue_size / lamda

    Outputs_arr.append(Traffic_intensity)
    Outputs_arr.append(Average_number_of_customers)
    Outputs_arr.append(Average_system_time)
    Outputs_arr.append(Number_customers_queue)
    Outputs_arr.append(Queue_time)

    return Outputs_arr



if __name__ == '__main__':
    app.run()
