import './style.scss'
import { TreeView } from './treeview.ts'

    var treeView = new TreeView(document.querySelector("main"), {
      dragStartCallback: function(event, node) {
        event.dataTransfer.setData("text/plain", node.textContent);
        return true;
      },
      dropCallback: function(event, dropLocation, orderedNodes) {
        document.querySelector("nav .dnd-result").textContent =
          event.dataTransfer.getData("text/plain") + " was dropped " +
          dropLocation.where + " " + dropLocation.target.textContent;
        return true;
      }
    });
    
    function createItem(label) {
      const itemElt = document.createElement("li");
    
      const iconElt = document.createElement("div");
      iconElt.classList.add("icon");
      itemElt.appendChild(iconElt);
    
      const spanElt = document.createElement("span");
      spanElt.textContent = label;
      itemElt.appendChild(spanElt);
    
      return itemElt;
    }
    
    function createGroup(label) {
      const groupElt = document.createElement("li");
    
      const spanElt = document.createElement("span");
      spanElt.textContent = label;
      groupElt.appendChild(spanElt);
    
      return groupElt;
    }
    
    for (var i = 0; i < 3; i++) {
      var group = createGroup("Group " + (i+1));
      treeView.append(group, "group");
    
      for (var j = 0; j < 3; j++) {
        var item = createItem("Item " + (i*3+j+1));
        treeView.append(item, "item", group);
      }
    }
    
    group = createGroup("Empty Group 1");
    treeView.append(group, "group", document.querySelector(".group"));
    
    group = createGroup("Empty Group 2");
    treeView.append(group, "group", document.querySelector(".group:last-child"));
    
    function onClickCreate(event) {
      var type = event.target.dataset.type;
      var label = prompt("Enter a name", "");
      if (label.length === 0) return;
      var node = (type === "item") ? createItem(label) : createGroup(label);
    
      var parentNode = treeView.selectedNodes[0];
      if (parentNode != null && !parentNode.classList.contains("group")) {
        parentNode = parentNode.parentElement.classList.contains("children") ? parentNode.parentElement.previousSibling : null;
      }
    
      treeView.append(node, type, parentNode);
    }
    
    function onAllGroupExpand(event) {
         treeView.all_expand_close(true);

    }

    function onAllGroupClose(event) {
         treeView.all_expand_close(false);

    }

    function onMoveUp(event) {
	    console.log("onMoveUp");
    }
    function onMoveDown(event) {
	    console.log("onMoveDown");
    }
    function onMoveLeft(event) {
	    console.log("onMoveLeft");
    }
    function onMoveRight(event) {
	    console.log("onMoveRight");
    }
    
    document.querySelector("nav .all-group-expand").addEventListener("click", onAllGroupExpand);
    document.querySelector("nav .all-group-close").addEventListener("click", onAllGroupClose);

    document.querySelector("nav .move-up").addEventListener("click", onMoveUp);
    document.querySelector("nav .move-down").addEventListener("click", onMoveDown);
    document.querySelector("nav .move-left").addEventListener("click", onMoveLeft);
    document.querySelector("nav .move-right").addEventListener("click", onMoveRight);

    document.querySelector("nav .create-item").addEventListener("click", onClickCreate);
    document.querySelector("nav .create-group").addEventListener("click", onClickCreate);
    
    document.querySelector("nav .remove-selected").addEventListener("click", function() {
      while (treeView.selectedNodes.length > 0) {
        treeView.remove(treeView.selectedNodes[treeView.selectedNodes.length - 1]);
      }
    });
    
    treeView.on("selectionChange", function() {
      var text;
      if (treeView.selectedNodes.length > 1) text = "" + treeView.selectedNodes.length + " items selected";
      else if (treeView.selectedNodes.length === 1) text = "1 item selected";
      else text = "No items selected";
    
      document.querySelector("nav .selected-nodes").textContent = text;
    });
    
    treeView.on("activate", function() {
      alert("Activated " + treeView.selectedNodes[0].querySelector("span").textContent);
    });
