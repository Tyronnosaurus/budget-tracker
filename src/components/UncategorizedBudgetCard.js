import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function UncategorizedBudgetCard(props) {

    const { getBudgetExpenses } = useBudgets()

    const uncategorizedExpenses = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID)
    const amount = uncategorizedExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    )
    
    if (amount===0) return null // Do not show card if it has no expenses

    return(
        <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
    )
}