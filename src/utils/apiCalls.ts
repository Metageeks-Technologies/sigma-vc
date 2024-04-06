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


export const uploadLogo = async (logo: File, uuid: string) => {

    try {
        const { data } = await axios.post(`/api/upload-s3`, { fileName: logo.name, uuid });
        console.log(data);
        if (data) {
            await axios.put(data.url, logo, {
                headers: {
                    "Content-Type": logo.type,
                },
            });
        }
        return data.s3key as string;
    } catch (error) {
        const e = error as any;
        console.log(e);
        return "";
    }
}