import React from 'react';
import axios from 'axios';
import './style.css';

var moment = require('moment');


class MyBooking extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            uid : '5dcae6e97871aaec87c56911',
            redirectToDashboard : false,
            bookings: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3000/bookings/user/',{
            uid: this.state.uid
        })
            .then((response) => {
                // handle success
                this.setState({bookings: response.data.bookings});
                console.log(response);
            })
            .catch(function (error) {
                alert('Cannot connect to server');
                console.log(error);
            });
    }

    render(){
        return(
           <div>
               <nav className="navbar navbar-expand-lg navbar-light bg-light">
                   <span className="navbar-brand mb-0 h1">BookingZone</span>
                   <button className="navbar-toggler" type="button" data-toggle="collapse"
                           data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                           aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                   </button>
                   <div className="collapse navbar-collapse justify-content-end">
                       <div className="navbar-nav">
                           <div className="nav-item nav-link">New Booking</div>
                           <div className="nav-item nav-link">Logout</div>
                       </div>
                   </div>
               </nav>

               <div className="mybooking_container container">
                    {/*<div className="upcoming_bookings_wrapper">*/}
                    {/*    <h3>Upcoming Bookings</h3>*/}
                    {/*    <div class="booking_wrapper" data-booking-id="1234">*/}
                    {/*        <div className="event">Event : <span className="event_name">TENNIS</span></div>*/}
                    {/*        <div className="day_wrapper">Day : <span className="day">16th November 2019 </span></div>*/}
                    {/*        <div className="time_wrapper">Time : <span className="time"><span className="starttime">9:00 A.M.</span> To <span className="endtime">10:00 A.M.</span></span></div>*/}
                    {/*        <div className="cancel_booking float-right">*/}
                    {/*            x Cancel Booking*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="booking_wrapper" data-booking-id="1234">*/}
                    {/*        <div className="event">Event : <span className="event_name">TENNIS</span></div>*/}
                    {/*        <div className="day_wrapper">Day : <span className="day">16th November 2019 </span></div>*/}
                    {/*        <div className="time_wrapper">Time : <span className="time"><span className="starttime">9:00 A.M.</span> To <span*/}
                    {/*            className="endtime">10:00 A.M.</span></span></div>*/}
                    {/*        <div className="cancel_booking float-right">*/}
                    {/*            x Cancel Booking*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <UpcomingBooking bookings={this.state.bookings}/>

                   <div className="past_bookings">
                       <h3>Past Bookings</h3>
                       <div className="booking_wrapper past" data-booking-id="1234">
                           <div className="event">Event : <span className="event_name">TENNIS</span></div>
                           <div className="day_wrapper">Day : <span className="day">16th November 2019 </span></div>
                           <div className="time_wrapper">Time : <span className="time"><span className="starttime">9:00 A.M.</span> To <span
                               className="endtime">10:00 A.M.</span></span></div>
                       </div>
                   </div>
               </div>
           </div>
        )
    }
}

function UpcomingBooking(props)
{
    let currenttime = Math.floor((new Date().getTime())/1000);
    let rows=[];
    for(let i=0;i<props.bookings.length;i++)
    {
        let booking = props.bookings[i];
        console.log(booking);
        console.log(booking.starttime);
        if(booking.starttime>currenttime)
        {
            rows.push(<Booking past="" booking_id={booking._id} event={booking.event} day={moment.unix(parseInt(booking.starttime)).format('Do MMM YYYY')} starttime={moment.unix(parseInt(booking.starttime)).format('hh:mm A')} endtime={moment.unix(parseInt(booking.endtime)).format('hh:mm A')}/>)
        }
    }
    return(
        <div className="upcoming_bookings_wrapper">
            <h3>Upcoming Bookings</h3>
            {rows}
        </div>
    );
}

function Booking(props)
{
    return(
        <div className={'booking_wrapper '+props.past} data-booking-id={props.booking_id}>
            <div className="event">Event : <span className="event_name">{props.event}</span></div>
            <div className="day_wrapper">Day : <span className="day">{props.day} </span></div>
            <div className="time_wrapper">Time : <span className="time"><span className="starttime">{props.starttime}</span> To <span
                className="endtime">{props.endtime}</span></span>
            </div>
            {CancelRequired(props.past)}
        </div>
    );
}

function CancelBooking(props)
{
    return(
        <div className="cancel_booking float-right">
            x Cancel Booking
        </div>
    )
}

function CancelRequired(isPast)
{
    if(!isPast) {
        return (
            <CancelBooking/>
        )
    }
}


export default MyBooking;