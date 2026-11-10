# solve_template.py

def xor_bytes(data, key):
    return bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])

cipher_hex = ""
cipher_bytes = bytes.fromhex(cipher_hex)

partial = xor_bytes(cipher_bytes, b" #key# ")
print("Partial XOR result:", partial)

# Final XOR logic