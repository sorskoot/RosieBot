const setup = () => {
    const nearestColorScript = document.createElement('script');
    document.body.appendChild(nearestColorScript);
    
    nearestColorScript.onload = onScriptLoad;
    nearestColorScript.src = 'https://cdn.rawgit.com/dtao/nearest-color/a017c25b/nearestColor.js';
  }
  
  const onScriptLoad = () => {
    console.log('nearest color script loaded');
      
    self._colors = {
      'cyan': '#8be9fd',
      'green': '#50fa7b',
      'orange': '#ffb86c',
      'pink': '#ff79c6',
      'purple': '#bd93f9',
      'red': '#fff5f6',
      'yellow': '#f1fa8c'
    };
  
    self._replaceColor = nearestColor.from(self._colors);
    
    
  
    const chatlog = document.querySelector('#log');
    const config = { childList: true };
    const observer = new MutationObserver(onMutation);
    observer.observe(chatlog, config);
  }
  
  const onMutation = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.addedNodes.length) {
        const addedNodesArray = [...mutation.addedNodes];
        const addedDivs = addedNodesArray.filter((node) => node.nodeName === 'DIV');
        
        if (addedDivs.length) {
          const chatDiv = addedDivs.pop();
          const chatNick = chatDiv.querySelector('.meta');
          const oldColor = chatNick.style.color;
          const newColor = self._replaceColor(oldColor);
          chatNick.classList.add(newColor.name || 'pink');
          chatNick.style.color = newColor.value || self._colors.pink;
        }
      }
    }
  };
  
  document.addEventListener('onLoad', setup);