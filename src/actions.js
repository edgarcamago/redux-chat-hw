import SendBird from "sendbird";

const fetchChannels = dispatch => () => {
  const payload = new Promise((resolve, reject) => {
    sendbird.OpenChannel.createOpenChannelListQuery().next((ch, err) => {
      resolve(ch);
    });
  });
  return dispatch({
    type: "FETCH_CHANNELS",
    payload
  });
};

const sendbird = new SendBird({
  appId: "8E20B6F8-D4EE-462C-8DAB-DF3CA610BE3F"
});

export default function mapDispatchToProps(dispatch) {
  return {
    connect: async userId => {
      const payload = new Promise((resolve, reject) => {
        sendbird.connect(
          userId,
          (u, err) => {
            resolve(u);
          }
        );
      });
      await dispatch({
        type: "CONNECTION",
        payload
      });
      return fetchChannels(dispatch)();
    },
    createChannel: name => {
      const payload = new Promise((resolve, reject) => {
        sendbird.OpenChannel.createChannel(name, name, "", (ch, err) => {
          if (err) {
            console.error(ch, err);
            reject(err);
          }
        });
        return dispatch({
          type: "CREATE_CHANNEL",
          payload,
          channel: name
        });
      });
    },
    selectChannel: ch => {
      dispatch({
        type: "SELECT_CHANNEL",
        channel: ch
      });
    }
  };
}
