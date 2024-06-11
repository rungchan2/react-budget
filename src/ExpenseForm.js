import React from 'react'
import "./ExpenseFrom.css"
import {MdSend} from 'react-icons/md'

const ExpenseForm = ({charge, amount, edit, handleCharge, handleAmount, handleSubmit}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='form-center'>
                    <div className='form-group'>
                        <label htmlFor='charge'>지출항목</label>
                        <input type='text'
                            className='form-control'
                            id='charge'
                            name='charge'
                            value={charge}
                            onChange={handleCharge}
                            placeholder='예) 렌트비'></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='amout'>비용</label>
                        <input type='number'
                            className='form-control'
                            id='amout'
                            name='amout'
                            value={amount}
                            onChange={handleAmount}
                            placeholder='예) 100원'></input>
                    </div>
                </div>
                <button type='submit' className='btn' >
                    {edit ? '수정' : '제출'} <MdSend 
                    className='btn-icon' />
                </button>
            </form>
        )
    }


export default ExpenseForm