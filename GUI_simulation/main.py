import math
import random
from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def home_call():
    return render_template('homePage.html')


@app.route('/help', methods=['GET'])
def help_call():
    return render_template('helpPage.html')


@app.route('/contact', methods=['GET'])
def contact_call():
    return render_template('contact.html')


@app.route('/createSim', methods=['GET'])
def createSim_call():
    return render_template('selectionPage.html')


@app.route('/mm1l', methods=['GET', 'POST'])
def mm1l_func():
    mue = 0
    lamda = 0
    entityC = 0
    QueueSize = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/1/L simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                mue = mu

        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                queueSize = splitArray[2]
                lamda = lam
                entityC = entityCount
                QueueSize = queueSize

        print("\nValues entered are:\nMue:"+str(mue)+"\nLambda:"+str(lamda)+"\nNumber of Entities:"+str(entityC)+"\nQueue size:"+str(QueueSize))
        return render_template('simulation_mm1l.html', mue=mue, lamda=lamda, entityC=entityC, QueueSize=QueueSize)
    else:
        return render_template('MM1LPage.html')


@app.route('/mm1', methods=['GET', 'POST'])
def mm1_func():
    Mu = 0
    Lam = 0
    entityC = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/1 simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                Mu = mu
        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                Lam = lam
                entityC = entityCount

        entityC = int(entityC)
        Lam = float(Lam)
        Mu = float(Mu)

        # Calculate the MQL values
        mql_values, entities_list = calculate_mql(entityC, Lam, Mu)
        entities_list = list(set(entities_list))

        print("\nValues entered are:\nMue:" + str(Mu) + "\nLambda:" + str(Lam) + "\nNumber of Entities:" + str(entityC))

        return render_template('simulation_mm1.html', mql_values=mql_values, entities_list=entities_list)
    else:
        return render_template('MM1Page.html')


@app.route('/mmc', methods=['GET', 'POST'])
def mmc_func():
    starting_list = []
    mue_list = []
    lamda = 0
    entity = 0
    server = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/C simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                starting_list.append(mu)
                mue_list = starting_list

        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                entity = entityCount
                lamda = lam

        for key, serverCount in request.form.items():
            if key.startswith("count"):
                server = serverCount

        mql_list, entity_list = simulationMQLmmc(entity, lamda, mue_list, server)
        mue = min(mue_list)

        print("\nValues entered are:\nALl the Mue values entered:"+str(mue_list)+"\nSelected min Mue:"+str(mue)+"\nLambda:"+str(lamda)+"\nServer count:"+str(server))

        return render_template('simulation_mmc.html', mue=mue, lamda=lamda, server=server, mql_list=mql_list, entity_list=entity_list)
    else:
        return render_template('MMCPage.html')


def simulationMQLmmc(Number_of_Entities, lamda, mue_list, Number_of_Servers):
    time_Arrival = 0
    Service_time_list = []
    Number_of_Entities = int(Number_of_Entities)
    lamda = int(lamda)
    Number_of_Servers = int(Number_of_Servers)

    Iat = -(1 / lamda) * math.log(random.random())
    Start_Serving = 0
    entity_list = []
    total_waiting_time = 0
    finish_list = []
    mql_list = []
    mql = 0
    j = 0

    for n in range(Number_of_Servers):
        finish_list.append(Start_Serving + (-(1 / int(min(mue_list))) * math.log(random.random())))
        Service_time_list.append(-(1 / int(min(mue_list))) * math.log(random.random()))

    for i in range(Number_of_Entities):
        j = i
        time_Arrival += Iat
        Iat = -(1 / lamda) * math.log(random.random())
        Start_Serving = max(time_Arrival, min(finish_list))
        for k in range(Number_of_Servers):
            Service_time_list[k] = (-(1 / int(min(mue_list))) * math.log(random.random()))

        for k in range(Number_of_Servers):
            if min(finish_list) == finish_list[k]:
                index = k

        finish_list[index] = Start_Serving + Service_time_list[index]
        entity_list.append(j)
        waiting = finish_list[index] - time_Arrival
        mql += waiting
        if i > 0:
            if abs(((mql / finish_list[index]) - (lamda/(int(min(mue_list))-lamda))) * 100) / (lamda/(int(min(mue_list))-lamda)) <= 0.15:
                mql_list.append(mql / finish_list[index])
                j = i
                break
        mql_list.append(mql / finish_list[index])
        total_waiting_time += waiting

    mql /= min(finish_list)
    print("MQL: ", mql_list[j])
    return mql_list, entity_list


@app.route('/mmcl', methods=['GET', 'POST'])
def mmcl_func():
    starting_list = []
    mue_list = []
    lamda = 0
    entity = 0
    limit = 0
    server = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/C/L simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                starting_list.append(mu)
                mue_list = starting_list

        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                lim = splitArray[2]
                lamda = lam
                limit = lim

        for key, serverCount in request.form.items():
            if key.startswith("count"):
                server = serverCount

        mue = min(mue_list)

        mql_list, entity_list = simMMCL(entityCount, lamda, mue_list, server, limit)

        print("\nValues entered are:\nALl the Mue values entered:"+str(mue_list)+"\nSelected min Mue:"+str(mue)+"\nLambda:"+str(lamda)+"\nServer count:"+str(server)+"\nLimit:"+str(limit))

        return render_template('simulation_mmcl.html', lamda=lamda, mue=mue, server=server, limit=limit, mql_list=mql_list, entity_list=entity_list)
    else:
        return render_template('MMCLPage.html')


def simMMCL(Number_of_Entities, lamda, mue_list, Number_of_Servers, QueueSize):
    time_Arrival = 0
    mue_list = mue_list
    Service_time_list = []
    Number_of_Entities = int(Number_of_Entities)
    lamda = int(lamda)
    Number_of_Servers = int(Number_of_Servers)
    QueueSize = int(QueueSize)

    Iat = -(1 / lamda) * math.log(random.random())
    Start_Serving = 0
    entity_list = []
    total_waiting_time = 0
    finish_list = []
    mql_list = []
    mql = 0
    counter = 0

    for n in range(Number_of_Servers):
        finish_list.append(Start_Serving + (-(1 / int(min(mue_list))) * math.log(random.random())))
        Service_time_list.append(-(1 / int(min(mue_list))) * math.log(random.random()))

    for i in range(Number_of_Entities):
        j = i
        if counter == QueueSize:
            time_Arrival += Iat
            Iat = -(1 / lamda) * math.log(random.random())
            Start_Serving = max(time_Arrival, min(finish_list))

            if Start_Serving == time_Arrival:
                counter += 1
            else:
                if counter > 0:
                    counter -= 1
                else:
                    counter = 0

        else:
            time_Arrival += Iat
            Iat = -(1 / lamda) * math.log(random.random())
            Start_Serving = max(time_Arrival, min(finish_list))
            if Start_Serving == time_Arrival:
                counter += 1
            else:
                if counter > 0:
                    counter -= 1
                else:
                    counter = 0

            for i in range(Number_of_Servers):
                Service_time_list[i] = (-(1 / int(min(mue_list))) * math.log(random.random()))

            for i in range(Number_of_Servers):
                if min(finish_list) == finish_list[i]:
                    index = i
                    break

            finish_list[index] = Start_Serving + Service_time_list[index]

            waiting = finish_list[index] - time_Arrival
            mql += waiting

            if abs(((mql / finish_list[index]) - (lamda/(int(min(mue_list))-lamda))) * 100) / (lamda/(int(min(mue_list))-lamda)) <= 0.15:
                mql_list.append(mql / finish_list[index])
                j = i
                entity_list.append(j)
                break

            entity_list.append(j)
            mql_list.append(mql / finish_list[index])
            total_waiting_time += waiting

    mql /= min(finish_list)
    return mql_list, entity_list


def calculate_mql(Number_of_Entities, lamda, mue):  # for M/M/1, calculating the MQL value
    time_Arrival = 0
    Iat = -1 / lamda * math.log(random.random())
    Start_Serving = 0
    entity_list = []
    finish_Time = Start_Serving + mue
    finish_list = []
    mql_list = []
    mql = 0
    for i in range(int(Number_of_Entities)):
        time_Arrival += Iat
        Iat = -(1 / lamda) * math.log(random.random())
        Start_Serving = max(time_Arrival, finish_Time)
        St = -(1 / mue) * math.log(random.random())
        finish_Time = Start_Serving + St
        entity_list.append(i)
        finish_list.append(finish_Time)
        waiting = finish_Time - time_Arrival
        mql += waiting

        if abs((((mql/finish_Time)-(lamda/(mue-lamda)))*100)/(lamda/(mue-lamda))) <= 0.15:
            mql_list.append(mql/finish_Time)
            break
        mql_list.append(mql / finish_Time)
        entity_list.append(i)
    return mql_list, entity_list


if __name__ == '__main__':
    app.run()
