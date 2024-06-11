import React from 'react'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({initialExpense, handleDelete, handleEdit, clearItems}) => {
    console.log(initialExpense)
    return (
      <React.Fragment>
        <ul className='list'>
            {/* 아이템 */}
            {initialExpense.map(expense => {
              return (
                <ExpenseItem 
                expense={expense}
                key={expense.id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                />
              )
            })}


            <button className='btn' onClick={clearItems}>
                목록지우기 <MdDelete className='btn-icon'/>
            </button>
        </ul>
      </React.Fragment>
    )
  }

export default ExpenseList