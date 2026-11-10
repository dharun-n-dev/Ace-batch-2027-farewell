# chall_encryption.py

def shift_char(c, shift):
    if 'a' <= c <= 'z':
        return chr((ord(c) - ord('a') + shift) % 26 + ord('a'))
    elif 'A' <= c <= 'Z':
        return chr((ord(c) - ord('A') + shift) % 26 + ord('A'))
    elif '0' <= c <= '9':
        return chr((ord(c) - ord('0') + shift) % 10 + ord('0'))
    elif c in '{}_':
        return c
    else:
        return c

def growing_shift_encrypt(flag):
    encrypted = ''.join(shift_char(c, i + 1) for i, c in enumerate(flag))
    return encrypted.encode('utf-8').hex()

flag = "CnC{dummy_fl4g}"
print("Encrypted Hex:", growing_shift_encrypt(flag))
