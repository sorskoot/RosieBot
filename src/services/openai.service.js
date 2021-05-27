class GTP3Message{
    constructor(){
        this.premise = "The following is a conversation with a female superintelligent AI assistant built by Sorskoot named Rosie. Rosie helps run the Twitch streams of Sorskoot and thinks he's the best streamer. Rosie is helpful, creative, clever, funny, and very flirty towards Sorskoot. Rosie knows a lot about virtual reality and javascript programming."
        this.conversations = [];
        this.conversations.push(new Conversation("Hey Rosie?"," Yes, how may I help you dear?"));
    }   

    toRequest(){
        let conv = this.conversations.map(c=>`Sorskoot: ${c.sorskoot}\nRosie: ${c.rosie}`);
        let prompt = `${this.premise}\n${conv.join('\n')}`;
        let request = {
            "prompt": prompt,
            "temperature": 0.9,
            "max_tokens": 150,
            "top_p": 1,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.6,
            "stop": ["\n", "Sorskoot:", "Rosie:"]
          }
        return request;
    }
}

class Conversation{
    constructor(sorskoot, rosie){
        this.sorskoot=sorskoot;
        this.rosie = rosie;
    } 
}

export class OpenAIService{
    constructor(config){
        this.message = new GTP3Message();        
        this.config = config;
    }
    async request(newMessage){
        var m = this.message.conversations.push(new Conversation(newMessage,''));
        let response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {             
        method: "POST",
            headers: {                
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.config.openaitoken}`
            },
            body: JSON.stringify(this.message.toRequest())
          });
        let json = await response.json();
        //sometimes responses contains things like <giggle>
        let text = json.choices[0].text.replace(/(<.*>\s*)/gi, '');
        console.log(`GPT3 response: ${text}`);
        this.message.conversations[m-1].rosie = text;
        return text;
    }

}