import math
import random
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('input.html')

@app.route('/input', methods=['GET', 'POST'])
def get_inputs():
    if request.method == 'POST':
        # Get the values of numberOfEntities, lambda, and mu from the POST request
        #numberOfEntities = request.form['numberOfEntities']
        lamda = request.form['lambda']
        mu = request.form['mu']
        queue_size = request.form['queuesize']

        # Convert the values to integers and floats
        lamda = float(lamda)
        mu = float(mu)
        queue_size = int(queue_size)

        # Calculate the MQL values
        #mql_values = calculate_mql(numberOfEntities, lamda, mu)
        #entities_list=[]
        #for i in range(numberOfEntities):
         #   entities_list.append(i)

        #return render_template('simulate.html', mql_values=mql_values, entities_list=entities_list)
    #else:
        return render_template('simulate.html')



def calculateoutputs(lamda,mue,queue_size):

  Traffic_intensity = lamda/mue
  Average_number_of_customers = Traffic_intensity/(1-Traffic_intensity)

  Average_system_time = Average_number_of_customers/lamda

  Number_customers_queue = Average_number_of_customers*Traffic_intensity

  if queue_size>Number_customers_queue:
    
    Queue_time = Number_customers_queue/lamda

  else :
    Queue_time = queue_size/lamda


if __name__ == '__main__':
    app.run()