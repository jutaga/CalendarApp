import { addHours } from 'date-fns';
import React, { useState } from 'react'

import Modal from 'react-modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const [formValues, setFormValues] = useState({
        title: 'Juan pablo',
        notes: 'Tabares',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const { title, notes, start, end } = formValues;

    const onInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }

    const onDateChange = (event, changing) => {

        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log('cerrando modal');
        setIsOpen(false);
    }



    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >

            <div className="container">


                <h1 className='text-center'> New Event </h1>
                <hr />
            </div>
            <form className="container">

                <div className="form-group mb-2">
                    <label>Start Date</label>
                    <DatePicker
                        selected={start}
                        onChange={(event) => onDateChange(event, 'start')}
                        className='form-control'
                        dateFormat={'Pp'}
                        showTimeSelect />
                </div>

                <div className="form-group mb-2">
                    <label>End Date</label>
                    <DatePicker
                        minDate={start}
                        selected={end}
                        onChange={(event) => onDateChange(event, 'end')}
                        className='form-control'
                        dateFormat={'Pp'}
                        showTimeSelect />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Short Description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        style={{ resize: 'none' }}
                        value={notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Extra Information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}
