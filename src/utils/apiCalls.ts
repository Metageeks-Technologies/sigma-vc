import axios from "axios";

export const addInvestment = async (bodyObj: any) => {
    try {
        const response = await axios.post("/api/investment", bodyObj);
        console.log(response);
        alert("Investment added successfully");
    } catch (error) {
        console.log(error);
    }
};

export const modifyInvestment = async (bodyObj: any) => {
    try {
        const response = await axios.patch("/api/investment", bodyObj);
        console.log(response, "response investment buy");
        alert("Project bought successfully");
    } catch (error) {
        console.log(error);
    }
};

export const sellStack = async (bodyObj: any) => {
    const { projectID, askAmount, userAddress } = bodyObj;
    console.log(projectID, askAmount)
    try {
        const response = await axios.patch(`/api/investment/${projectID}`, { askAmount, userAddress });
        console.log(response, "response investment sell");
        alert("Project listed for sell successfully");

    } catch (error) {
        console.log(error);
    }
};
