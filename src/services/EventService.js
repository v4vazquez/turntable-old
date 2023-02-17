import axios from "axios";


//use axios.get instead?
export default {
    
   getEvent(id) {
       return axios.get(`/events/${id}`);
   },
   getAllEvents() {
       return axios.get('/events/all-events');
    },
   createEvent(event, dj) {
       return axios.post(`/events/newEvent/${dj}`, event)
   },
   updateEvent(id, event) {
        return axios.put(`/events/update-event/${id}`, event);
   },
   deleteEvent(id) {
       return axios.delete(`/events/delete-event/${id}`);
   },
 
   //added code below 2/7
   getEventIdFromDj() {
       return axios.get('events/eventId');
   },
   getDjs(){
       return axios.get('users/djs')
   }

}