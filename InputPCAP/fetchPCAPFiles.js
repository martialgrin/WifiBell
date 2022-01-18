const IPV4Connection = require("../processDatas/IPV4Connection");
const IPV6Connection = require("../processDatas/IPV6Connection");
const pcap = require("pcap"),
  pcap_session = pcap.createOfflineSession("./assets/dump-04.cap");

let packetCount = 0;
let sessMB = 0;

pcap_session.on("packet", function (raw_packet) {
  packetCount++;

  const packet = pcap.decode.packet(raw_packet);
  //console.log(packet.paylrootoad.payload);
  if (packet.payload.payload != null) {
    const addrIPV4 = IPV4Connection(packet);
    if (typeof addrIPV4 != "undefined") {
      // console.log(addrIPV4);
    }

    // console.log(packet.payload);

    // const addrIPV6 = IPV6Connection(packet);
    // if (typeof addrIPV6 != "undefined") {
    //   // console.log(addrIPV6);
    // }
  }
});

/*******************************
 *  Analyze when there is an Handshake between differents
 * **************************** */

// var pcap = require("pcap"),
//   tcp_tracker = new pcap.TCPTracker(),
//   pcap_session = pcap.createSession("en0", "ip proto \\tcp");

// tcp_tracker.on("session", function (session) {
//   console.log(
//     "Start of session between " + session.src_name + " and " + session.dst_name
//   );
//   session.on("end", function (session) {
//     console.log(
//       "End of TCP session between " +
//         session.src_name +
//         " and " +
//         session.dst_name
//     );
//   });
// });

// pcap_session.on("packet", function (raw_packet) {
//   var packet = pcap.decode.packet(raw_packet);
//   tcp_tracker.track_packet(packet);
// });

/*******************************
 *  END Analyze when there is an Handshake between differents
 * **************************** */
//
//
//
//

// const PcapSession = {
//     is_live: true,
//     device_name: 'en0',
//     filter: '',
//     buffer_size: 10485760,
//     snap_length: 65535,
//     outfile: '',
//     is_monitor: false,
//     buffer_timeout: 1000,
//     promiscuous: true,
//     link_type: 'LINKTYPE_ETHERNET',
//     opened: true,
//     buf: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 65485 more bytes>,
//     header: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
//     empty_reads: 0,
//     packets_read: null,
//     session: PcapSession { read_callback: [Function (anonymous)] },
//     _events: [Object: null prototype] {},
//     _eventsCount: 0,
//     _maxListeners: undefined,
//     [Symbol(kCapture)]: false
//   }
//   const PcapPacket = {
//     link_type: 'LINKTYPE_ETHERNET',
//     pcap_header: PcapHeader {
//       tv_sec: 1641886548,
//       tv_usec: 493713,
//       caplen: 60,
//       len: 60
//     },
//     payload: EthernetPacket {
//       emitter: undefined,
//       dhost: EthernetAddr { addr: [Array] },
//       shost: EthernetAddr { addr: [Array] },
//       ethertype: 2054,
//       vlan: null,
//       payload: Arp {
//         emitter: undefined,
//         htype: 1,
//         ptype: 2048,
//         hlen: 6,
//         plen: 4,
//         operation: 1,
//         sender_ha: [EthernetAddr],
//         sender_pa: [IPv4Addr],
//         target_ha: [EthernetAddr],
//         target_pa: [IPv4Addr]
//       }
//     },
//     emitter: undefined
//   }
