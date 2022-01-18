const pcap = require("pcap");
const IPV4Connection = require("../processDatas/IPV4Connection");
let packetMB = 0;
let lastPacketMB = 0;
const fs = require("fs");
let numPackets = 0;
module.exports = function epochSession(_callback) {
  //   pcap_session = pcap.createOfflineSession(
  //     "./session/__0000" + epochs + "_" + src + ".cap"
  //   );
  let path;

  fs.readdir("session", function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(files);
    path = files[files.length - 1];
    let packet = resolvePackets(path);

    _callback(packet);

    // console.log(path);
  });

  // pcap_session = pcap.createOfflineSession(
  //   "./session/__" + ("00000" + epochs).slice(-5) + "_" + src
  // );

  // console.log(packetInterval);
};

const resolvePackets = (src) => {
  lastPacketMB = packetMB;

  pcap_session = pcap.createOfflineSession("./session/" + src + "");

  pcap_session.on("packet", function (raw_packet) {
    // console.log(numPackets);
    numPackets++;
    const packet = pcap.decode.packet(raw_packet);
    if (packet.payload.payload != null) {
      if (typeof packet.payload.payload.length != "undefined") {
        packetMB += packet.payload.payload.length;
      }
      const addrIPV4 = IPV4Connection(packet);
      if (typeof addrIPV4 != "undefined") {
        console.log(addrIPV4);
      }
    }
  });

  // console.log(packet.payload);

  // const addrIPV6 = IPV6Connection(packet);
  // if (typeof addrIPV6 != "undefined") {
  //   // console.log(addrIPV6);
  // }
  //   }

  // console.log("epoch:" + packetMB);
  return { size: packetMB, nb: numPackets };
};
