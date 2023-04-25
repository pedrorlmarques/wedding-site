<template>
	<section>
		<div class="wrapper">
			<slot></slot>
		</div>
	</section>
</template>

<style lang="postcss">
	body {
		@apply bg-primary-100;
	}

	.wrapper {
		@apply flex flex-col items-center justify-center px-6 mx-auto min-h-screen h-full;

		& .wedding-font {
			@apply text-6xl text-white my-8 text-center font-medium;
		}

		& .symbol {
			@apply flex bg-transparent rounded-full p-4 border-solid border-4 border-white;

			& .rings {
				@apply w-16 h-16 fill-white;
			}

			> img {
				@apply w-12 h-12;
			}
		}
	}

	.card {
		@apply bg-white w-full rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0;

		& .space {
			@apply p-6 space-y-4 md:space-y-6 sm:p-8;

			& .hello {
				@apply text-xl font-bold leading-tight tracking-tight text-secondary-200 md:text-2xl;
			}

			& .btn {
				@apply inline-block text-primary-600 hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-0;

				& svg {
					@apply inline-block w-5 h-5 mr-2 -ml-1 text-primary-600 hover:text-white;
				}

				&:hover {
					& svg {
						@apply stroke-white;
					}
				}
			}
		}
	}

	form {
		@apply space-y-4 md:space-y-6;

		& button.google-btn {
			@apply text-white w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center mb-2;
		}

		& > div {
			& label {
				@apply block mb-2 text-sm font-medium text-gray-900;
			}

			& input {
				@apply bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 block w-full p-2.5;
			}
		}

		& .checkbox {
			@apply w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-secondary-300 accent-secondary-400;
		}

		& .forgot,
		& .register {
			@apply text-sm font-medium text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-600;
		}

		& .register {
			@apply ml-2;
		}

		& button[type='submit'] {
			@apply w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center;

			&[disabled] {
				@apply bg-gray-300 cursor-not-allowed;
			}
		}

		& [data-invalid] .formkit-inner {
			@apply border rounded-lg border-red-500;
		}

		& .formkit-messages {
			& .formkit-message {
				@apply text-xs text-red-500 mt-1;
			}
		}

		& .formkit-help {
			@apply text-xs text-gray-500 mt-1;
		}
	}
</style>
