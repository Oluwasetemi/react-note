<template>
  <div class="bg-white shadow-md rounded-md p-4 max-w-xl mx-auto">
    <div class="space-y-4 max-h-[400px] overflow-y-auto">
      <transition name="slide">
        <div v-if="!showSolution" key="question" class="space-y-4">
          <div class="rounded-md p-4 bg-gray-100">
            <h2 class="text-xl text-blue-500 font-bold mb-2">
              Create a form with complex state handling
            </h2>
            <div
              class="bg-gray-300 text-gray-900 rounded-md p-3 overflow-auto text-sm"
            >
              <pre v-if="ready" v-html="formattedQuestion"></pre>
            </div>
          </div>
          <button
            class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm"
            @click="showSolution = true"
          >
            Show Solution
          </button>
        </div>
      </transition>
      <transition name="slide">
        <div
          v-if="showSolution"
          key="solution"
          class="space-y-4 light:text-white"
        >
          <div class="bg-green-100 rounded-md p-4">
            <h2 class="text-xl text-green-900 font-bold mb-2">Solution</h2>
            <div class="bg-gray-900 rounded-md p-3 overflow-auto text-sm">
              <pre v-if="ready" v-html="formattedSolution"></pre>
            </div>
          </div>
          <button
            class="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors text-sm"
            @click="showSolution = false"
          >
            Hide Solution
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { codeToHtml } from 'https://esm.sh/shiki@1.0.0'
import prettier from 'https://esm.sh/prettier@2.3.2/standalone.mjs'
import prettierPluginBabel from 'https://unpkg.com/prettier@3.4.1/plugins/babel.mjs'

const code = `
  // Create a form with complex state handling
  function RegistrationForm() {
    // 1. Complex state structure
    const [form, setForm] = useState({
      personal: {
        firstName: '',
        lastName: '',
        email: ''
      },
      address: {
        street: '',
        city: '',
        country: ''
      },
      preferences: {
        newsletter: false,
        theme: 'light'
      }
    });
    // 2. Update handlers
    const updatePersonal = (field) => (event) => {
    };
    const updateAddress = (field) => (event) => {
    };
    const toggleNewsletter = () => {
    };
    // 3. Side effect for form validation
    useEffect(() => {
    }, [form]);

    return (
      <form>
        {/* Personal Information */}
        <input
          value={form.personal.firstName}
          onChange={updatePersonal('firstName')}
          placeholder="First Name"
        />
        {/* Add other fields similarly */}

        {/* Newsletter Toggle */}
      </form>
    );
  }
`

const correct = `
  // Create a form with complex state handling
  function RegistrationForm() {
    // 1. Complex state structure
    const [form, setForm] = useState({
      personal: {
        firstName: '',
        lastName: '',
        email: ''
      },
      address: {
        street: '',
        city: '',
        country: ''
      },
      preferences: {
        newsletter: false,
        theme: 'light'
      }
    });
    // 2. Update handlers
    const updatePersonal = (field) => (event) => {
      setForm(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          [field]: event.target.value
        }
      }));
    };
    const updateAddress = (field) => (event) => {
      setForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: event.target.value
        }
      }));
    };
    const toggleNewsletter = () => {
      setForm(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          newsletter: !prev.preferences.newsletter
        }
      }));
    };
    // 3. Side effect for form validation
    useEffect(() => {
      const errors = validateForm(form);
      if (errors.length > 0) {
        console.log('Form has errors:', errors);
      }
    }, [form.personal.firstName, form.personal.lastName, form.personal.email, form.address.street, form.address.city, form.address.country, form.preferences.newsletter, form.preferences.theme]);

    return (
      <form>
        {/* Personal Information */}
        <input
          value={form.personal.firstName}
          onChange={updatePersonal()}
          placeholder="First Name"
        />
        {/* Add other fields similarly */}

        {/* Newsletter Toggle */}
        <label>
          <input
            type="checkbox"
            checked={form.preferences.newsletter}
            onChange={toggleNewsletter}
          />
          Subscribe to newsletter
        </label>
      </form>
    );
  }
`

const options = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
}

const formattedCode = prettier.format(code, {
  ...options,
  parser: 'babel',
  plugins: [prettierPluginBabel],
})

const formattedSolutionPrettier = prettier.format(correct, {
  ...options,
  parser: 'babel',
  plugins: [prettierPluginBabel],
})

let formattedQuestion = ref('')
let formattedSolution = ref('')
let ready = ref(false)

onMounted(async () => {
  formattedQuestion = await codeToHtml(formattedCode, {
    lang: 'jsx',
    theme: 'vitesse-dark',
  })

  formattedSolution = await codeToHtml(formattedSolutionPrettier, {
    lang: 'jsx',
    theme: 'vitesse-dark',
  })
  ready.value = true
})

const showSolution = ref(false)
</script>
s

<style>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

pre {
  font-family: 'Fira Code', monospace;
}
</style>
