import * as crypto from "crypto";

export interface DnsProvider {
  id: string;
  name: string;
  tagline: string;
  servers: string[];
  ipv6Servers: string[];
  category:
    | "tier1-tspu"
    | "cloudflare"
    | "google"
    | "security"
    | "adguard"
    | "regional"
    | "custom";
}

export const DNS_PROVIDERS: DnsProvider[] = [
  {
    id: "tier1-combo-5",
    name: "Связка 5: Восток-Европа ТСПУ Диссонанс",
    tagline: "Comss Dual, NTT Japan, Lumen, Verizon, DT, Cogent",
    servers: [
      "83.220.169.155",
      "212.109.195.93",
      "129.250.35.250",
      "4.2.2.6",
      "198.6.1.5",
      "194.25.2.130",
      "38.113.1.2",
    ],
    ipv6Servers: [],
    category: "tier1-tspu",
  },
  {
    id: "tier1-combo-1",
    name: "Связка 1: Smart DNS + Tier-1 Транзит",
    tagline: "Comss, Lumen, NTT, Hurricane Electric, Cogent",
    servers: [
      "83.220.169.155",
      "212.109.195.93",
      "4.2.2.1",
      "129.250.35.250",
      "74.82.42.42",
      "38.113.1.2",
    ],
    ipv6Servers: [],
    category: "tier1-tspu",
  },
  {
    id: "tier1-combo-2",
    name: "Связка 2: Европейский Серверный Транзит",
    tagline: "Comss, Arelion, Telenor, Deutsche Telekom, Lumen",
    servers: [
      "83.220.169.155",
      "212.109.195.93",
      "195.67.197.3",
      "193.212.1.10",
      "194.25.2.129",
      "4.2.2.1",
    ],
    ipv6Servers: [],
    category: "tier1-tspu",
  },
  {
    id: "tier1-combo-3",
    name: "Связка 3: Магистраль EU/US Tier-1",
    tagline: "Comss, Lumen, NTT, Deutsche Telekom, Cogent, HE",
    servers: [
      "83.220.169.155",
      "4.2.2.2",
      "129.250.35.252",
      "194.25.2.131",
      "38.113.1.3",
      "74.82.42.42",
    ],
    ipv6Servers: [],
    category: "tier1-tspu",
  },
  {
    id: "tier1-combo-4",
    name: "Связка 4: Широкий разброс США / Европа",
    tagline: "Comss, Verizon, Lumen, NTT, Arelion, Cogent, HE",
    servers: [
      "83.220.169.155",
      "198.6.1.3",
      "4.2.2.5",
      "129.250.35.251",
      "195.67.198.3",
      "38.113.1.5",
      "74.82.42.42",
    ],
    ipv6Servers: [],
    category: "tier1-tspu",
  },
  {
    id: "tier1-combo-6",
    name: "Связка 6: Максимальная Отказоустойчивость",
    tagline: "Comss, Lumen, Verizon, NTT Europe, Telenor, Arelion, HE",
    servers: [
      "83.220.169.155",
      "4.2.2.3",
      "198.6.1.4",
      "129.250.35.252",
      "193.212.1.10",
      "195.67.197.3",
      "74.82.42.42",
    ],
    ipv6Servers: [],
    category: "tier1-tspu",
  },
  {
    id: "cloudflare-default",
    name: "Cloudflare (1.1.1.1)",
    tagline: "Ultra-fast anycast DNS, default for WARP",
    servers: ["1.1.1.1", "1.0.0.1"],
    ipv6Servers: ["2606:4700:4700::1111", "2606:4700:4700::1001"],
    category: "cloudflare",
  },
  {
    id: "google-public",
    name: "Google Public DNS (8.8.8.8)",
    tagline: "Global reliable anycast resolution",
    servers: ["8.8.8.8", "8.8.4.4"],
    ipv6Servers: ["2001:4860:4860::8888", "2001:4860:4860::8844"],
    category: "google",
  },
  {
    id: "adguard-dns",
    name: "AdGuard DNS (94.140.14.14)",
    tagline: "Blocks ads, trackers & phishing across apps",
    servers: ["94.140.14.14", "94.140.15.15"],
    ipv6Servers: ["2a10:50c0::ad1:ff", "2a10:50c0::ad2:ff"],
    category: "adguard",
  },
  {
    id: "quad9-security",
    name: "Quad9 Security (9.9.9.9)",
    tagline: "High-security DNS blocking known threats",
    servers: ["9.9.9.9", "149.112.112.112"],
    ipv6Servers: ["2620:fe::fe", "2620:fe::9"],
    category: "security",
  },
  {
    id: "yandex-basic",
    name: "Yandex DNS Basic (77.88.8.8)",
    tagline: "Low latency in CIS/RU region",
    servers: ["77.88.8.8", "77.88.8.1"],
    ipv6Servers: ["2a02:6b8::feed:0ff", "2a02:6b8:0:1::feed:0ff"],
    category: "regional",
  },
  {
    id: "custom",
    name: "Custom DNS Server",
    tagline: "Specify your own IPv4 / IPv6 DNS servers",
    servers: ["1.1.1.1", "8.8.8.8"],
    ipv6Servers: [],
    category: "custom",
  },
];

export const WARP_CUSTOM_PORTS: number[] = [
  864, 859, 7103, 955, 2371, 908, 8854, 3138, 1070, 854, 3581, 928, 894,
  7281, 7156, 945, 2507, 880, 1014, 903, 500, 2506, 1843, 1180, 891, 946,
  1010, 4198, 1387, 8886, 4177, 3854, 4199, 4233, 878, 968, 942, 7152,
  7559, 5279, 8319, 2408, 443,
];

export interface EndpointOption {
  id: string;
  address: string;
  port: number;
  label: string;
  badge: string;
  region: string;
  description: string;
}

export const ENDPOINT_OPTIONS: EndpointOption[] = [
  {
    id: "cf-domain-default",
    address: "engage.cloudflareclient.com",
    port: 2408,
    label: "engage.cloudflareclient.com:2408",
    badge: "Official Domain",
    region: "Anycast Domain",
    description: "Standard domain endpoint; can be combined with any WARP port",
  },
  {
    id: "cf-ip-1",
    address: "162.159.192.1",
    port: 2408,
    label: "162.159.192.1:2408",
    badge: "Clean IP #1",
    region: "Anycast IPv4",
    description: "Direct clean Anycast IPv4, bypasses DNS blocks",
  },
  {
    id: "cf-ip-2",
    address: "162.159.193.5",
    port: 2408,
    label: "162.159.193.5:2408",
    badge: "Recommended",
    region: "Anycast IPv4",
    description: "Best latency & stability for AWG 2.0 / 1.5",
  },
  {
    id: "cf-ip-3",
    address: "188.114.97.3",
    port: 2408,
    label: "188.114.97.3:2408",
    badge: "RU/CIS Fast",
    region: "Europe/CIS",
    description: "Optimized route for Eastern Europe & CIS ISPs",
  },
  {
    id: "cf-ip-4",
    address: "188.114.96.1",
    port: 2408,
    label: "188.114.96.1:2408",
    badge: "Clean IP #2",
    region: "Europe Anycast",
    description: "Low jitter endpoint for mobile & fiber",
  },
  {
    id: "cf-port-443",
    address: "162.159.193.5",
    port: 443,
    label: "162.159.193.5:443",
    badge: "Port 443",
    region: "Anycast IPv4",
    description: "UDP port 443 (QUIC mimic) — usually unblocked",
  },
  {
    id: "cf-port-443-2",
    address: "188.114.97.3",
    port: 443,
    label: "188.114.97.3:443",
    badge: "Port 443 EU",
    region: "Europe/CIS",
    description: "Alternative 443 endpoint for Eastern Europe",
  },
  {
    id: "cf-port-500",
    address: "engage.cloudflareclient.com",
    port: 500,
    label: "engage.cloudflareclient.com:500",
    badge: "Port 500 Bypass",
    region: "Global Anycast",
    description: "Uses UDP port 500 (IPSec default) to evade port restrictions",
  },
  {
    id: "cf-port-859",
    address: "engage.cloudflareclient.com",
    port: 859,
    label: "engage.cloudflareclient.com:859",
    badge: "Port 859 WARP",
    region: "Global Anycast",
    description: "Tested WARP port for evading DPI signature filters",
  },
  {
    id: "custom-endpoint",
    address: "engage.cloudflareclient.com",
    port: 7103,
    label: "Custom IP / Port Selector",
    badge: "Manual / Port",
    region: "Custom",
    description: "Specify any clean IP or pick a tested WARP port below",
  },
];

export interface ObfuscationParams {
  jc: number;
  jmin: number;
  jmax: number;
  s1: number;
  s2: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  i1: string;
  i2: string;
  i3: string;
  i4: string;
}

export const DEFAULT_OBFUSCATION_PARAMS: Record<string, ObfuscationParams> = {
  "new-3-4-911": {
    jc: 3,
    jmin: 4,
    jmax: 911,
    s1: 84,
    s2: 54,
    h1: 1778114400,
    h2: 1140023414,
    h3: 1883501258,
    h4: 1346001719,
    i1: "4cfa7107",
    i2: "64fa8331",
    i3: "21b36991",
    i4: "78b301aa",
  },
  "tspu-118-22-1000": {
    jc: 118,
    jmin: 22,
    jmax: 1000,
    s1: 84,
    s2: 54,
    h1: 1829340911,
    h2: 1439201923,
    h3: 1782392811,
    h4: 1283920191,
    i1: "e02b7811",
    i2: "c1920844",
    i3: "f0912a77",
    i4: "00823c12",
  },
  "tspu-5-10-40": {
    jc: 5,
    jmin: 10,
    jmax: 40,
    s1: 70,
    s2: 90,
    h1: 1033100222,
    h2: 1938392111,
    h3: 1782390123,
    h4: 1293847291,
    i1: "4cfa7107",
    i2: "64fa8331",
    i3: "21b36991",
    i4: "78b301aa",
  },
  "tspu-5-40-70": {
    jc: 5,
    jmin: 40,
    jmax: 70,
    s1: 64,
    s2: 64,
    h1: 1778114400,
    h2: 1140023414,
    h3: 1883501258,
    h4: 1346001719,
    i1: "4cfa7107",
    i2: "64fa8331",
    i3: "21b36991",
    i4: "78b301aa",
  },
  "tspu-4-40-70": {
    jc: 4,
    jmin: 40,
    jmax: 70,
    s1: 84,
    s2: 54,
    h1: 1010101,
    h2: 2020202,
    h3: 3030303,
    h4: 4040404,
    i1: "11223344",
    i2: "55667788",
    i3: "99aabbcc",
    i4: "ddeeff00",
  },
  "tspu-3-1-3": {
    jc: 3,
    jmin: 1,
    jmax: 3,
    s1: 40,
    s2: 40,
    h1: 1555444333,
    h2: 1444333222,
    h3: 1333222111,
    h4: 1222111000,
    i1: "4cfa7107",
    i2: "64fa8331",
    i3: "21b36991",
    i4: "78b301aa",
  },
  "junk-one-long-l1": {
    jc: 1,
    jmin: 900,
    jmax: 1250,
    s1: 150,
    s2: 54,
    h1: 1778114400,
    h2: 1140023414,
    h3: 1883501258,
    h4: 1346001719,
    i1: "4cfa7107",
    i2: "64fa8331",
    i3: "21b36991",
    i4: "78b301aa",
  },
  "junk-multi-short-l123": {
    jc: 6,
    jmin: 12,
    jmax: 48,
    s1: 36,
    s2: 48,
    h1: 1829340911,
    h2: 1439201923,
    h3: 1782392811,
    h4: 1283920191,
    i1: "e02b7811",
    i2: "c1920844",
    i3: "f0912a77",
    i4: "00823c12",
  },
  "awg2.0-default": {
    jc: 7,
    jmin: 50,
    jmax: 1000,
    s1: 84,
    s2: 54,
    h1: 1778114400,
    h2: 1140023414,
    h3: 1883501258,
    h4: 1346001719,
    i1: "4cfa7107",
    i2: "64fa8331",
    i3: "21b36991",
    i4: "78b301aa",
  },
  "awg1.5-classic": {
    jc: 3,
    jmin: 40,
    jmax: 70,
    s1: 40,
    s2: 80,
    h1: 1010101,
    h2: 2020202,
    h3: 3030303,
    h4: 4040404,
    i1: "",
    i2: "",
    i3: "",
    i4: "",
  },
};

export interface ConfigGenerateRequest {
  title?: string;
  protocol:
    | "amneziawg-2.0"
    | "amneziawg-1.5"
    | "wiresocks"
    | "clash-meta"
    | "wireguard"
    | "sing-box";
  dnsProviderId: string;
  customDnsServers?: string;
  endpointAddress: string;
  endpointPort: number;
  mtu: number;
  obfuscation: ObfuscationParams;
  warpKeyMode: "free-auto" | "warp-plus-key" | "custom-keypair";
  customPrivateKey?: string;
  customPublicKey?: string;
  customClientV4?: string;
  customClientV6?: string;
  warpPlusLicense?: string;
  reservedBits?: string; // "[0, 0, 0]" or "[24, 182, 11]"
  routingMode: "all" | "exclude-lan" | "custom-ips";
  customAllowedIps?: string;
}

export interface GeneratedConfigPayload {
  title: string;
  protocol: string;
  configText: string;
  filename: string;
  fileExtension: string;
  dnsString: string;
  endpointString: string;
  mtu: number;
  privateKey: string;
  publicKey: string;
  clientV4: string;
  clientV6: string;
  reservedBits: string;
  obfuscation: ObfuscationParams;
  shareToken: string;
  qrContent: string;
  instructions: string[];
}

export function generateRawKeyPair(): { privateKey: string; publicKey: string } {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("x25519", {
    publicKeyEncoding: { type: "spki", format: "der" },
    privateKeyEncoding: { type: "pkcs8", format: "der" },
  });
  const rawPub = publicKey.subarray(publicKey.length - 32);
  const rawPriv = privateKey.subarray(privateKey.length - 32);
  return { privateKey: rawPriv.toString("base64"), publicKey: rawPub.toString("base64") };
}

export async function registerWithWarp(clientPubKey: string): Promise<{
  serverPubKey: string;
  clientV4: string;
  clientV6: string;
  reservedBits: string;
} | null> {
  try {
    const body = JSON.stringify({
      key: clientPubKey,
      install_id: "",
      fcm_token: "",
      tos: new Date().toISOString().split("T")[0],
      model: "PC",
      serial_number: "",
      locale: "ru_RU",
    });
    const res = await fetch("https://api.cloudflareclient.com/v0a802/reg", {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "okhttp/4.12.0" },
      body,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      serverPubKey: data.config?.peers?.[0]?.public_key || data.account?.license || "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=",
      clientV4: data.config?.interface?.addresses?.v4 || "172.16.0.2/32",
      clientV6: data.config?.interface?.addresses?.v6 || `2606:4700:110:8f00::${crypto.randomBytes(4).toString("hex")}/128`,
      reservedBits: data.config?.interface?.addresses?.v4?.reserved_bits || "[0, 0, 0]",
    };
  } catch {
    return null;
  }
}

export function generateWireGuardKeyPair(): {
  privateKey: string;
  publicKey: string;
  clientV4: string;
  clientV6: string;
  reservedBits: string;
} {
  try {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("x25519", {
      publicKeyEncoding: {
        type: "spki",
        format: "der",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "der",
      },
    });

    const rawPubKey = publicKey.subarray(publicKey.length - 32);
    const rawPrivKey = privateKey.subarray(privateKey.length - 32);

    const privBase64 = rawPrivKey.toString("base64");
    const pubBase64 = rawPubKey.toString("base64");

    const randV6Suffix = crypto.randomBytes(4).toString("hex");
    const clientV4 = "172.16.0.2/32";
    const clientV6 = `2606:4700:110:8f00::${randV6Suffix}/128`;
    const reservedBits = `[0, 0, 0]`;

    return {
      privateKey: privBase64,
      publicKey: "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=",
      clientV4,
      clientV6,
      reservedBits,
    };
  } catch (e) {
    const priv = crypto.randomBytes(32).toString("base64");
    const pub = "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=";
    return {
      privateKey: priv,
      publicKey: pub,
      clientV4: "172.16.0.2/32",
      clientV6: "2606:4700:110:8f00:0:0:0:1/128",
      reservedBits: "[0, 0, 0]",
    };
  }
}

export function resolveDnsServers(req: ConfigGenerateRequest): string {
  if (req.dnsProviderId === "custom" && req.customDnsServers) {
    return req.customDnsServers;
  }
  const provider =
    DNS_PROVIDERS.find((p) => p.id === req.dnsProviderId) || DNS_PROVIDERS[0];
  return provider.servers.join(", ");
}

export function resolveAllowedIps(req: ConfigGenerateRequest): string {
  if (req.routingMode === "exclude-lan") {
    return "0.0.0.0/5, 8.0.0.0/7, 11.0.0.0/8, 12.0.0.0/6, 16.0.0.0/4, 32.0.0.0/3, 64.0.0.0/2, 128.0.0.0/3, 160.0.0.0/5, 168.0.0.0/6, 172.0.0.0/12, 172.32.0.0/11, 172.64.0.0/10, 172.128.0.0/9, 173.0.0.0/8, 174.0.0.0/7, 176.0.0.0/4, 192.0.0.0/9, 192.128.0.0/11, 192.160.0.0/13, 192.169.0.0/16, 192.170.0.0/15, 192.172.0.0/14, 192.176.0.0/12, 192.192.0.0/10, 193.0.0.0/8, 194.0.0.0/7, 196.0.0.0/6, 200.0.0.0/5, 208.0.0.0/4, ::/0";
  }
  if (req.routingMode === "custom-ips" && req.customAllowedIps) {
    return req.customAllowedIps;
  }
  return "0.0.0.0/0, ::/0";
}

export function generateAmneziaWgConf(
  req: ConfigGenerateRequest,
  keyPair: {
    privateKey: string;
    publicKey: string;
    clientV4: string;
    clientV6: string;
    reservedBits?: string;
  }
): string {
  const obf = req.obfuscation;
  const isV2 = req.protocol === "amneziawg-2.0";
  const ep = `${req.endpointAddress}:${req.endpointPort}`;
  const allowedIps = req.routingMode === "all" ? "0.0.0.0/0" : resolveAllowedIps(req);

  let conf = `[Interface]
PrivateKey = ${keyPair.privateKey}
Address = ${keyPair.clientV4}
DNS = 1.1.1.1
MTU = ${req.mtu}
Jc = ${obf.jc}
Jmin = ${obf.jmin}
Jmax = ${obf.jmax}
S1 = ${obf.s1}
S2 = ${obf.s2}
H1 = ${obf.h1}
H2 = ${obf.h2}
H3 = ${obf.h3}
H4 = ${obf.h4}
`;

  if (isV2) {
    conf += `I1 = ${obf.i1 || "4cfa7107"}
I2 = ${obf.i2 || "64fa8331"}
I3 = ${obf.i3 || "21b36991"}
I4 = ${obf.i4 || "78b301aa"}
`;
  }

  conf += `
[Peer]
PublicKey = ${keyPair.publicKey}
AllowedIPs = ${allowedIps}
Endpoint = ${ep}
PersistentKeepalive = 25
`;

  return conf;
}

export function generateWireGuardConf(
  req: ConfigGenerateRequest,
  keyPair: {
    privateKey: string;
    publicKey: string;
    clientV4: string;
    clientV6: string;
    reservedBits?: string;
  }
): string {
  const dnsString = resolveDnsServers(req);
  const allowedIps = resolveAllowedIps(req);
  const ep = `${req.endpointAddress}:${req.endpointPort}`;

  return `[Interface]
PrivateKey = ${keyPair.privateKey}
Address = ${keyPair.clientV4}
Address = ${keyPair.clientV6}
DNS = ${dnsString}
MTU = ${req.mtu}

[Peer]
PublicKey = ${keyPair.publicKey}
AllowedIPs = ${allowedIps}
Endpoint = ${ep}
PersistentKeepalive = 25
`;
}

export function generateWiresocksConf(
  req: ConfigGenerateRequest,
  keyPair: {
    privateKey: string;
    publicKey: string;
    clientV4: string;
    clientV6: string;
    reservedBits?: string;
  }
): string {
  const dnsString = resolveDnsServers(req);
  const allowedIps = resolveAllowedIps(req);
  const ep = `${req.endpointAddress}:${req.endpointPort}`;

  return `[Interface]
PrivateKey = ${keyPair.privateKey}
Address = ${keyPair.clientV4}
Address = ${keyPair.clientV6}
DNS = ${dnsString}
MTU = ${req.mtu}

[Peer]
PublicKey = ${keyPair.publicKey}
AllowedIPs = ${allowedIps}
Endpoint = ${ep}
PersistentKeepalive = 25
`;
}

export function generateClashMetaYaml(
  req: ConfigGenerateRequest,
  keyPair: {
    privateKey: string;
    publicKey: string;
    clientV4: string;
    clientV6: string;
    reservedBits?: string;
  }
): string {
  const dnsServers = resolveDnsServers(req)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const obf = req.obfuscation;
  const isAwg = req.protocol.includes("amneziawg");
  const isV2 = req.protocol === "amneziawg-2.0";

  const cleanIp4 = keyPair.clientV4.replace("/32", "");
  const cleanIp6 = keyPair.clientV6.replace("/128", "");

  let yaml = `# WVFWARP — Clash Meta / Mihomo Configuration
# Compatible with Mihomo, Sing-Box (clash mode), Clash Verge Rev
port: 7890
socks-port: 7891
mixed-port: 7892
allow-lan: false
mode: rule
log-level: info
ipv6: true

dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: true
  enhanced-mode: fake-ip
  nameserver:
`;
  dnsServers.forEach((dns) => {
    yaml += `    - "https://dns.google/dns-query"
    - "udp://${dns}"
`;
  });

  yaml += `
proxies:
  - name: "WVFWARP-AmneziaWG"
    type: wireguard
    server: ${req.endpointAddress}
    port: ${req.endpointPort}
    ip: ${cleanIp4}
    ipv6: ${cleanIp6}
    public-key: ${keyPair.publicKey}
    private-key: ${keyPair.privateKey}
    mtu: ${req.mtu}
    remote-dns-resolve: true
    udp: true
`;

  if (isAwg) {
    yaml += `    # AmneziaWG Obfuscation parameters for DPI Bypass
    amneziawg:
      jc: ${obf.jc}
      jmin: ${obf.jmin}
      jmax: ${obf.jmax}
      s1: ${obf.s1}
      s2: ${obf.s2}
      h1: ${obf.h1}
      h2: ${obf.h2}
      h3: ${obf.h3}
      h4: ${obf.h4}
`;
    if (isV2) {
      yaml += `      i1: "${obf.i1 || "4cfa7107"}"
      i2: "${obf.i2 || "64fa8331"}"
      i3: "${obf.i3 || "21b36991"}"
      i4: "${obf.i4 || "78b301aa"}"
`;
    }
  }

  yaml += `
proxy-groups:
  - name: "PROXIES"
    type: select
    proxies:
      - "WVFWARP-AmneziaWG"
      - DIRECT

rules:
  - GEOIP,RU,DIRECT,no-resolve
  - MATCH,PROXIES
`;

  return yaml;
}

export function generateSingBoxJson(
  req: ConfigGenerateRequest,
  keyPair: {
    privateKey: string;
    publicKey: string;
    clientV4: string;
    clientV6: string;
    reservedBits?: string;
  }
): string {
  const dnsServers = resolveDnsServers(req)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const obf = req.obfuscation;
  const isAwg = req.protocol.includes("amneziawg");
  const isV2 = req.protocol === "amneziawg-2.0";

  const jsonConfig: any = {
    log: {
      level: "info",
      timestamp: true,
    },
    dns: {
      servers: [
        {
          tag: "default-dns",
          address: dnsServers[0] || "1.1.1.1",
          detour: "wvfwarp-out",
        },
      ],
    },
    inbounds: [
      {
        type: "mixed",
        tag: "mixed-in",
        listen: "127.0.0.1",
        listen_port: 1080,
      },
    ],
    outbounds: [
      {
        type: "wireguard",
        tag: "wvfwarp-out",
        server: req.endpointAddress,
        server_port: req.endpointPort,
        local_address: [keyPair.clientV4, keyPair.clientV6],
        private_key: keyPair.privateKey,
        peer_public_key: keyPair.publicKey,
        mtu: req.mtu,
        reserved: [0, 0, 0],
      },
      {
        type: "direct",
        tag: "direct",
      },
    ],
  };

  if (isAwg) {
    const obfObj: any = {
      jc: obf.jc,
      jmin: obf.jmin,
      jmax: obf.jmax,
      s1: obf.s1,
      s2: obf.s2,
      h1: obf.h1,
      h2: obf.h2,
      h3: obf.h3,
      h4: obf.h4,
    };
    if (isV2) {
      obfObj.i1 = obf.i1 || "4cfa7107";
      obfObj.i2 = obf.i2 || "64fa8331";
      obfObj.i3 = obf.i3 || "21b36991";
      obfObj.i4 = obf.i4 || "78b301aa";
    }
    jsonConfig.outbounds[0].amnezia = obfObj;
  }

  return JSON.stringify(jsonConfig, null, 2);
}

export async function generateFullConfig(
  req: ConfigGenerateRequest
): Promise<GeneratedConfigPayload> {
  let keyPair: {
    privateKey: string;
    publicKey: string;
    clientV4: string;
    clientV6: string;
    reservedBits?: string;
  };

  if (
    req.warpKeyMode === "custom-keypair" &&
    req.customPrivateKey &&
    req.customPublicKey
  ) {
    keyPair = {
      privateKey: req.customPrivateKey,
      publicKey: req.customPublicKey,
      clientV4: req.customClientV4 || "172.16.0.2/32",
      clientV6: req.customClientV6 || "2606:4700:110:8f00:0:0:0:1/128",
      reservedBits: req.reservedBits || "[0, 0, 0]",
    };
  } else {
    const rawKey = generateRawKeyPair();
    const reg = await registerWithWarp(rawKey.publicKey);
    if (reg) {
      keyPair = {
        privateKey: rawKey.privateKey,
        publicKey: reg.serverPubKey,
        clientV4: reg.clientV4,
        clientV6: reg.clientV6,
        reservedBits: reg.reservedBits,
      };
    } else {
      keyPair = generateWireGuardKeyPair();
    }
  }

  const randomId = String(Math.floor(1000000 + Math.random() * 9000000));
  let configText = "";
  let filename = `wvfwarp-${req.protocol}`;
  let fileExtension = ".conf";
  let instructions: string[] = [];

  switch (req.protocol) {
    case "amneziawg-2.0":
    case "amneziawg-1.5":
      configText = generateAmneziaWgConf(req, keyPair);
      filename = `WARP${randomId}`;
      fileExtension = ".conf";
      instructions = [
        "Download or copy the WVFWARP AmneziaWG configuration (.conf).",
        "Open the AmneziaWG client on Android, iOS, Windows, macOS, or Linux.",
        "Click '+ Add Tunnel' -> 'Import from file or QR Code'.",
        "Activate the tunnel and verify DPI bypass on blocked websites!",
      ];
      break;

    case "wiresocks":
      configText = generateWiresocksConf(req, keyPair);
      filename = `wvfwarp-wiresocks`;
      fileExtension = ".conf";
      instructions = [
        "Download the Wiresocks profile (.conf).",
        "Install Wiresocks GUI or Wiresocks command-line client on Windows/Linux.",
        "Import the profile to enable high-speed SOCKS5 / WireGuard WARP bridge.",
        "You can customize AllowedApps in the file to route only specific applications through WARP.",
      ];
      break;

    case "clash-meta":
      configText = generateClashMetaYaml(req, keyPair);
      filename = `wvfwarp-clash-meta`;
      fileExtension = ".yaml";
      instructions = [
        "Download the Clash Meta (.yaml) file.",
        "Import into Clash Verge Rev, Mihomo, Nyanpasu, or Clash for Android.",
        "Select the 'WVFWARP-AmneziaWG' proxy in your Proxy Group.",
        "Enjoy AmneziaWG DPI evasion directly inside your Clash routing tree!",
      ];
      break;

    case "sing-box":
      configText = generateSingBoxJson(req, keyPair);
      filename = `wvfwarp-singbox`;
      fileExtension = ".json";
      instructions = [
        "Download the Sing-Box (.json) configuration.",
        "Load the config into Sing-Box CLI or graphical Sing-Box clients.",
        "Connect to the wireguard/amnezia outbound interface.",
      ];
      break;

    case "wireguard":
    default:
      configText = generateWireGuardConf(req, keyPair);
      filename = `wvfwarp-wireguard`;
      fileExtension = ".conf";
      instructions = [
        "Download the standard WireGuard (.conf) configuration.",
        "Open the official WireGuard app on your device.",
        "Import the tunnel and connect to Cloudflare WARP.",
      ];
      break;
  }

  const shareToken = crypto.randomBytes(8).toString("hex");

  return {
    title: req.title || `WARP ${randomId}`,
    protocol: req.protocol,
    configText,
    filename: `${filename}${fileExtension}`,
    fileExtension,
    dnsString: resolveDnsServers(req),
    endpointString: `${req.endpointAddress}:${req.endpointPort}`,
    mtu: req.mtu,
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
    clientV4: keyPair.clientV4,
    clientV6: keyPair.clientV6,
    reservedBits: req.reservedBits || keyPair.reservedBits || "[0, 0, 0]",
    obfuscation: req.obfuscation,
    shareToken,
    qrContent: configText,
    instructions,
  };
}
