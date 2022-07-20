<template>
  <div class="fullscreen" style="padding: 100px">
    <div>
      <h2 class="text-h3">How to register ECDSA address.</h2>
      <br />
      Never share you seed phrase or private keys with anyone. For registering ECDSA address public
      key needs to be entered manually.<br />
      Here are the steps:<br /><br />
      <ul>
        <li>Install <a href="https://docs.substrate.io/v3/tools/subkey/">subkey</a> tool.</li>
        <li>Go to command line.</li>
        <li>Run:</li>
        <li><code>curl https://getsubstrate.io -sSf | bash -s -- --fast</code></li>
        <li>
          <code>
            cargo install --force subkey --git https://github.com/paritytech/substrate --version
            2.0.1 --locked
          </code>
        </li>
        <li>
          <code>subkey inspect --scheme ecdsa "Your 12 words mnemonic seed phrase" </code>
        </li>
        <li>Copy Public key (hex) value including 0x.</li>
        <li>Enter this value when prompted during registration.</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ECDSA',
});
</script>
