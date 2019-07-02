let commands = {};
let existingCommands;

module.exports = {
    
    init:(existing)=>{
        existingCommands = existing;
    },

    command: (twitchClient, target, context, action, command, ...message) => {
        if(!action){
            
            return;
        }
        switch(action.toLowerCase()){
            case "add": 
                message=message.join(' ');
                let newCommand = command.toLowerCase();
                if(!newCommand.startsWith('!')){
                    twitchClient.say(target,`${context['display-name']}, a command should start with a '!'.`);
                    return;
                }
                if(!message){
                    twitchClient.say(target,`${context['display-name']}, a command should have a message, it's a useless this way.`);
                    return;
                }
                if(commands.hasOwnProperty(newCommand) || existingCommands.hasOwnProperty(newCommand)){
                    twitchClient.say(target,`That's not going to work, ${context['display-name']}. The ${command} already exists...`);
                    return;
                }else{
                    commands[newCommand] = message;
                    twitchClient.say(target,`${context['display-name']} just added the ${newCommand} command.`);
                }
            break
            case "remove":
                if(!context.badges.broadcaster && !context.mod){
                    twitchClient.say(target,`${context['display-name']} removing commands is mod only, sorry`);
                    return;
                }
                delete commands[command];
                break;
            case "list":
                if(Object.keys.length){
                    twitchClient.say(target,`The temporary commands available are: ${Object.keys(commands).join(',')}`);
                }
                else{
                    twitchClient.say(target,`There are no temporary commands available. Why don't you create one?`);
                }
                break;
            case "help":
                    twitchClient.say(target,"You can create a temporary command by typing !command add !newCommand some message. You can add {name} for the username or {msg} to add a message to the command.");
                break;
            default:
                twitchClient.say(target,`I'm sorry ${context['display-name']}. I don't know what you mean... options are !command {add, remove, list, help}`);
                return;
        }
    },

    hasCommand:(command)=>{
        return commands.hasOwnProperty(command) 
    },

    execute: (twitchClient, target, context, command, args) => {
        if(commands.hasOwnProperty(command)){
            let executeCommand = commands[command].replace('{name}', context['display-name']);
            executeCommand = executeCommand.replace('{msg}', args);
            twitchClient.say(target, executeCommand);
        }
    }
}