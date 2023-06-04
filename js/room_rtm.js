let handleMemberJoined = async (MemberId) => {
  console.log("joined");
  addMemberToDom(MemberId);

  let members = await channel.getMembers();
  updateMemberTotal(members);
};

let addMemberToDom = async (MemberId) => {
  let { name } = await rtmClient.getUserAttributeByKeys(MemberId, ["name"]);

  let membersWrapper = document.getElementById("member__list");

  let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                    <span class="green__icon"></span>
                    <p class="member_name">${name}</p>
                </div>`;

  membersWrapper.insertAdjacentHTML("beforeend", memberItem);
};

let updateMemberTotal = async () => {
  let total = document.getElementById("members__count");
  total.innerText = members.length;
};

let handleMemberLeft = async (MemberId) => {
  removeMemberFromDom(MemberId);
};

let removeMemberFromDom = async (MemberId) => {
  let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`);

  memberWrapper.remove();
};

let getMember = async () => {
  let members = await channel.getMembers();
  updateMemberTotal(members);

  for (let i = 0; members.length > i; i++) {
    addMemberToDom(members[i]);
  }
};
let handleChannelMessage = async (messageData, MemberId) => {
  console.log("received");

  let data = JSON.parse(messageData.text);
  console.log(data);
};
let sendMessage = async (e) => {
  e.preventDefault();

  let message = e.target.message.value;
  channel.sendMessage({
    text: JSON.stringify({
      type: "chat",
      message: message,
      displayName: displayName,
    }),
  });
  addMessageToDom(displayName, message);
  e.target.reset();
};

let addMessageToDom = (name, message) => {
  let messagesWrapper = docmuent.getElementById("messages");
  let newMessage = ` <div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${name}</strong>
                            <p class="message__text">${message}</p>
                        </div>
                    </div>`;

  messagesWrapper.insertAdjacentHTML("beforeend", newMessage);
  let lastMessage = document.querySelector(
    "#messages .message__wrapper:last-child"
  );

  if (lastMessage) {
    lastMessage.scrollIntoView(); 
  }
};

let leavechannel = async () => {
  await channel.leave();
  await rtmClient.logout();
};

window.addEventListener("beforeunload", leavechannel);
let messageForm = document.getElementById("message__form");
messageForm.addEventListener("submit", sendMessage);
