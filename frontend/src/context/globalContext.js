import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Function to clear incomes and expenses
    const clearTransactions = () => {
        setIncomes([]);
        setExpenses([]);
    };

    // Helper function to get config with authorization token
    const getAuthConfig = () => {
        const token = localStorage.getItem('token');
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    };

    // Function to handle login
    const login = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, credentials);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            setUser(user);
            setError(null);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Function to handle registration
    const register = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}register`, userData);
            setError(null);
            // Redirect to login page or login user directly
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Function to handle logout
    const logout = async () => {
        try {
            await axios.delete(`${BASE_URL}clear-data`, getAuthConfig());
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
            clearTransactions();
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    // Function to add income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income, getAuthConfig());
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Function to get incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`, getAuthConfig());
            setIncomes(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Function to delete income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthConfig());
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Calculate total income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Function to add expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense, getAuthConfig());
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Function to get expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, getAuthConfig());
            setExpenses(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Function to delete expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthConfig());
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Calculate total expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Calculate total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Get transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalIncome,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            login,
            register,
            logout
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
