Arrival_rate = float(input('Enter Arrival rate : '))
Service_rate = float(input('Enter Service rate : '))
LQ_threshold = float(input('Enter limit for number of customers in the queue : '))
Traffic_intensity = Arrival_rate/Service_rate

print('Traffic intensity is: {:.2f}'.format(Traffic_intensity))

Average_number_of_customers = Traffic_intensity/(1-Traffic_intensity)

print('Average number of customers (L) is: {:.2f}'.format(Average_number_of_customers))

Average_system_time = Average_number_of_customers/Arrival_rate

print('Average time spent in the system (W) is: {:.2f}'.format(Average_system_time))

Number_customers_queue = Average_number_of_customers*Traffic_intensity

print('Number of customers in the queue (LQ) is: {:.2f}'.format(Number_customers_queue))

if LQ_threshold>Number_customers_queue:
    
    print('Number of customers is less than the queue threshold !')
    Queue_time = Number_customers_queue/Arrival_rate

    print('Time spent in the queue (WQ) is: {:.2f}'.format(Queue_time))

else :
 
    print('Number of customers is greater than the queue threshold !')
    Queue_time = LQ_threshold/Arrival_rate

    print('Time spent in the queue (WQ) is: {:.2f}'.format(Queue_time))  


