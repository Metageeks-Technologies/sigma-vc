import axios from "axios";

export const addInvestment = async (bodyObj: any) => {
    try {
        const response = await axios.post("http://localhost:3000/api/investment", bodyObj);
        console.log(response);
        alert("Project listed successfully");
    } catch (error) {
        console.log(error);
    }
};
