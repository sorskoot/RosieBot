export default class QnaService {
    
    constructor(kbName,kbId,kbEndpointKey){

        this.kbName = kbName;
        this.kbId = kbId;
        this.kbEndpointKey=kbEndpointKey;
        this.url =
        `https://${kbName}.azurewebsites.net/qnamaker/knowledgebases/${kbId}/generateAnswer`
    
    }

    async call(msg) {
        let value = await fetch(this.url,
            {
                method: "POST",
                headers: {
                    "Authorization": `EndpointKey ${this.kbEndpointKey}`,
                    "Content-Type": "application/json"
                },
                credentials: 'include' ,
                body: JSON.stringify({
                    "question": msg
                })
            });
        let json = value.json();
        return json;
    };
}