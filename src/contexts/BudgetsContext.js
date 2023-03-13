import React, {useContext} from 'react'
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'


const BudgetsContext = React.createContext()


export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"


export function useBudgets() {
    return(useContext(BudgetsContext))
}


/*
Budget:  object containing id, name & max.
Expense: object containing id, budgetId, amount & description.
*/

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidV4(), description, amount, budgetId}]
        })
    }

    function addBudget({name, max}){
        setBudgets(prevBudgets => {
            // If it already exists, don't add it
            if (prevBudgets.find(budget => budget.name === name))
                return(prevBudgets)
            // Otherwise, add it to the existing budgets
            return([...prevBudgets, {id:uuidV4(), name, max}])
        })
    }

    function deleteBudget({id}){

        // Deal with orphan expenses (set them as uncategorized)
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense // Expense from anoter budget -> do not modify it
                return {...expense, budgetId:UNCATEGORIZED_BUDGET_ID} // Expense from deleted budget -> change its budget id
            })
        })

        // Actually delete the budget
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
        
    }

    function deleteExpense({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }


    return(
        <BudgetsContext.Provider value={{budgets, expenses, getBudgetExpenses,
                                         addExpense, addBudget, deleteBudget,
                                         deleteExpense}}>
            {children}
        </BudgetsContext.Provider>
    )
}