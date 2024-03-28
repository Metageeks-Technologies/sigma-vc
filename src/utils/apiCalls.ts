import axios from "axios";

export const addInvestment = async (bodyObj: any) => {
    try {
        const response = await axios.post("/api/investment", bodyObj);
        console.log(response);
        alert("investment added successfully");
    } catch (error) {
        console.log(error);
    }
};

export const modifyInvestment = async (bodyObj: any) => {
    try {
        const response = await axios.patch("/api/investment", bodyObj);
        console.log(response);
        alert("Project listed successfully");
    } catch (error) {
        console.log(error);
    }
};

export const sellStack = async (bodyObj: any) => {
    const { projectID, askAmount } = bodyObj;
    console.log(projectID, askAmount)
    try {
        const response = await axios.patch(`/api/investment/${projectID}`, { askAmount });
        console.log(response);

    } catch (error) {
        console.log(error);
    }
};
