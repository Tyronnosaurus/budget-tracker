import { Modal, Button, Stack } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from '../utils'


const ViewExpensesModal = ({budgetId, handleClose}) => {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const expenses = getBudgetExpenses(budgetId)

    const budget = (UNCATEGORIZED_BUDGET_ID === budgetId) ?
                    {name: "Uncategorized", id:UNCATEGORIZED_BUDGET_ID} :
                    budgets.find(b => b.id === budgetId)

    return(
        <Modal show={budgetId != null} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses in {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={() => {deleteBudget(budget)
                                                    handleClose()}}
                                    variant="outline-danger">
                                Delete budget
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button size="sm" variant="outline-danger"
                                    onClick={()=>deleteExpense(expense)}>
                                &times;     {/* The X button */}
                            </Button> 
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>

        </Modal>
    )
}

export default ViewExpensesModal