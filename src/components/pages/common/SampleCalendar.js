import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

function SampleCalendar({articles}) {
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }
    return (
        <div>
           {articles.length>0 && 
                <div>
                    <Calendar 
                    value={dateState}
                    onChange={changeDate}
                    />
                    <p className="mt-3">Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
                </div>
           }
        </div>
    )
}

export default SampleCalendar
